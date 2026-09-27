import { Router, Response } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middleware/auth";
import { calendarRepository } from "../repositories/calendar.repository";
import { calendarService } from "../services/calendar.service";

const router = Router();

// Get calendar connection status
router.get("/status", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const connection = await calendarRepository.getConnection(req.user.userId);
    res.json({
      connected: connection?.connected || false,
      tokenExpiry: connection?.token_expiry,
    });
  } catch (error) {
    console.error("Error getting calendar status:", error);
    res.status(500).json({ error: "Failed to get calendar status" });
  }
});

// Connect calendar (save tokens from Descope)
router.post("/connect", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { accessToken, refreshToken, expiresAt } = req.body;

    if (!accessToken) {
      res.status(400).json({ error: "Access token is required" });
      return;
    }

    const connection = await calendarRepository.saveConnection(
      req.user.userId,
      accessToken,
      refreshToken,
      new Date(expiresAt)
    );

    res.json({ connected: true, connection });
  } catch (error) {
    console.error("Error connecting calendar:", error);
    res.status(500).json({ error: "Failed to connect calendar" });
  }
});

// Refresh calendar tokens
router.post("/refresh", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { accessToken, expiresAt } = req.body;

    await calendarRepository.updateTokens(
      req.user.userId,
      accessToken,
      new Date(expiresAt)
    );

    res.json({ refreshed: true });
  } catch (error) {
    console.error("Error refreshing calendar tokens:", error);
    res.status(500).json({ error: "Failed to refresh tokens" });
  }
});

// Disconnect calendar
router.post("/disconnect", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    await calendarRepository.disconnect(req.user.userId);
    res.json({ connected: false });
  } catch (error) {
    console.error("Error disconnecting calendar:", error);
    res.status(500).json({ error: "Failed to disconnect calendar" });
  }
});

// List events
router.get("/events", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const maxResults = parseInt(req.query.maxResults as string) || 10;
    const events = await calendarService.listEvents(req.user.userId, maxResults);
    res.json({ events });
  } catch (error) {
    console.error("Error listing events:", error);
    res.status(500).json({ error: "Failed to list events" });
  }
});

export default router;
