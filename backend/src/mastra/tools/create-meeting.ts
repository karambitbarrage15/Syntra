import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { calendarService } from "../../services/calendar.service";

export const createMeetingTool = createTool({
  id: "create-meeting",
  description: "Create a new meeting/event in the user's Google Calendar. Can include Google Meet link and email invites.",
  inputSchema: z.object({
    summary: z.string().describe("Title of the meeting"),
    description: z.string().optional().default("").describe("Description of the meeting"),
    startDateTime: z.string().describe("Start date and time in ISO 8601 format (e.g., 2024-12-25T10:00:00Z)"),
    endDateTime: z.string().describe("End date and time in ISO 8601 format (e.g., 2024-12-25T11:00:00Z)"),
    attendees: z.array(z.string()).optional().describe("List of attendee email addresses"),
    addGoogleMeet: z.boolean().optional().default(false).describe("Whether to add a Google Meet link"),
  }),
  execute: async ({ context, mapiData }) => {
    const userId = (mapiData as any)?.userId;
    if (!userId) throw new Error("User ID is required");

    const event = await calendarService.createEvent(
      userId,
      context.summary,
      context.description,
      context.startDateTime,
      context.endDateTime,
      context.attendees,
      context.addGoogleMeet
    );

    return {
      success: true,
      event: {
        id: event.id,
        summary: event.summary,
        start: event.start?.dateTime,
        end: event.end?.dateTime,
        meetLink: event.hangoutLink,
        htmlLink: event.htmlLink,
      },
    };
  },
});
