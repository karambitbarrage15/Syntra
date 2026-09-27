import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { calendarService } from "../services/calendar.service";

export function createMcpServer() {
  const server = new McpServer({
    name: "Syntra Calendar MCP",
    version: "1.0.0",
  });

  // List scheduled meetings tool
  server.tool(
    "list_scheduled_meetings",
    "List upcoming scheduled meetings from a user's Google Calendar",
    {
      userId: z.string().describe("The Descope user ID"),
      maxResults: z.number().optional().default(10).describe("Max number of events"),
    },
    async ({ userId, maxResults }) => {
      try {
        const events = await calendarService.listEvents(userId, maxResults);

        const formattedEvents = events.map((event: any) => ({
          id: event.id,
          title: event.summary,
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date,
          meetLink: event.hangoutLink,
        }));

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(formattedEvents, null, 2),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  return server;
}
