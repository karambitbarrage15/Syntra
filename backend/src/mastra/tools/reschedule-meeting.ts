import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { calendarService } from "../../services/calendar.service";

export const rescheduleMeetingTool = createTool({
  id: "reschedule-meeting",
  description: "Reschedule an existing meeting by updating its start and/or end time",
  inputSchema: z.object({
    eventId: z.string().describe("The ID of the event to reschedule"),
    newStartDateTime: z.string().describe("New start date and time in ISO 8601 format"),
    newEndDateTime: z.string().describe("New end date and time in ISO 8601 format"),
    newSummary: z.string().optional().describe("Optionally update the meeting title"),
  }),
  execute: async ({ context, mapiData }) => {
    const userId = (mapiData as any)?.userId;
    if (!userId) throw new Error("User ID is required");

    const updatedEvent = await calendarService.updateEvent(userId, context.eventId, {
      startDateTime: context.newStartDateTime,
      endDateTime: context.newEndDateTime,
      summary: context.newSummary,
    });

    return {
      success: true,
      event: {
        id: updatedEvent.id,
        summary: updatedEvent.summary,
        start: updatedEvent.start?.dateTime,
        end: updatedEvent.end?.dateTime,
      },
    };
  },
});
