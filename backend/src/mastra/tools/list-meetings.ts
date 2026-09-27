import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { calendarService } from "../../services/calendar.service";

export const listMeetingsTool = createTool({
  id: "list-meetings",
  description: "List upcoming meetings/events from the user's Google Calendar",
  inputSchema: z.object({
    maxResults: z.number().optional().default(10).describe("Maximum number of events to return"),
  }),
  execute: async ({ context, mapiData }) => {
    const userId = (mapiData as any)?.userId;
    if (!userId) throw new Error("User ID is required");

    const events = await calendarService.listEvents(userId, context.maxResults);

    return {
      events: events.map((event: any) => ({
        id: event.id,
        summary: event.summary,
        description: event.description,
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
        meetLink: event.hangoutLink,
        attendees: event.attendees?.map((a: any) => a.email),
        status: event.status,
      })),
      totalEvents: events.length,
    };
  },
});
