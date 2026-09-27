import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { calendarService } from "../../services/calendar.service";

export const cancelMeetingTool = createTool({
  id: "cancel-meeting",
  description: "Cancel/delete a meeting from the user's Google Calendar",
  inputSchema: z.object({
    eventId: z.string().describe("The ID of the event to cancel/delete"),
  }),
  execute: async ({ context, mapiData }) => {
    const userId = (mapiData as any)?.userId;
    if (!userId) throw new Error("User ID is required");

    await calendarService.deleteEvent(userId, context.eventId);

    return {
      success: true,
      message: `Meeting ${context.eventId} has been cancelled successfully.`,
    };
  },
});
