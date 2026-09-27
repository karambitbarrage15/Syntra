import { Router, Response } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middleware/auth";
import { mastra } from "../mastra";
import { conversationRepository } from "../repositories/conversation.repository";

const router = Router();

// Get all conversations for the user
router.get("/conversations", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const conversations = await conversationRepository.findByUserId(req.user.userId);
    res.json({ conversations });
  } catch (error) {
    console.error("Error getting conversations:", error);
    res.status(500).json({ error: "Failed to get conversations" });
  }
});

// Create a new conversation
router.post("/conversations", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const conversation = await conversationRepository.create(req.user.userId, req.body.title);
    res.json({ conversation });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

// Get messages for a conversation
router.get("/conversations/:id/messages", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const messages = await conversationRepository.getMessages(req.params.id);
    res.json({ messages });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
});

// Chat with agent (streaming)
router.post("/chat", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { message, conversationId } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    // Create or get conversation
    let convId = conversationId;
    if (!convId) {
      const conversation = await conversationRepository.create(req.user.userId);
      convId = conversation.id;
    }

    // Save user message
    await conversationRepository.addMessage(convId, "user", message);

    // Get conversation history for context
    const history = await conversationRepository.getMessages(convId);
    const messages = history.slice(-20).map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    // Set up SSE
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    // Send conversation ID first
    res.write(`data: ${JSON.stringify({ type: "conversationId", conversationId: convId })}\n\n`);

    // Get the agent and stream response
    const agent = mastra.getAgent("calendarAgent");
    const response = await agent.stream(messages, {
      mapiData: { userId: req.user.userId },
    });

    let fullResponse = "";

    // Stream chunks to client
    const reader = response.textStream.getReader();

    const processStream = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        fullResponse += value;
        res.write(`data: ${JSON.stringify({ type: "chunk", content: value })}\n\n`);
      }

      // Save assistant response
      if (fullResponse) {
        await conversationRepository.addMessage(convId, "assistant", fullResponse);
      }

      res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
      res.end();
    };

    processStream().catch((error) => {
      console.error("Stream error:", error);
      res.write(`data: ${JSON.stringify({ type: "error", error: error.message })}\n\n`);
      res.end();
    });
  } catch (error: any) {
    console.error("Error in chat:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  }
});

// Delete conversation
router.delete("/conversations/:id", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    await conversationRepository.deleteConversation(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

export default router;
