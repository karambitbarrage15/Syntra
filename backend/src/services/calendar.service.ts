import { google } from "googleapis";
import { calendarRepository } from "../repositories/calendar.repository";
import { descopeClient } from "../middleware/auth";

export const calendarService = {
  async getCalendarConnectUrl(userId: string): Promise<string> {
    try {
      // Use Descope to get the Google Calendar connection URL
      const response = await descopeClient.management.user.generateEmbeddedLink(
        userId,
        { customClaims: { connection: "google-calendar" } }
      );
      return response.data?.token || "";
    } catch (error) {
      console.error("Error generating calendar connect URL:", error);
      throw error;
    }
  },

  async getCalendarClient(userId: string) {
    const connection = await calendarRepository.getConnection(userId);

    if (!connection || !connection.access_token) {
      throw new Error("No calendar connection found. Please connect your Google Calendar.");
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: connection.access_token,
      refresh_token: connection.refresh_token,
    });

    return google.calendar({ version: "v3", auth: oauth2Client });
  },

  async listEvents(userId: string, maxResults: number = 10) {
    const calendar = await this.getCalendarClient(userId);
    const now = new Date().toISOString();

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: now,
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });

    return response.data.items || [];
  },

  async createEvent(
    userId: string,
    summary: string,
    description: string,
    startDateTime: string,
    endDateTime: string,
    attendees?: string[],
    addGoogleMeet: boolean = false
  ) {
    const calendar = await this.getCalendarClient(userId);

    const event: any = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "UTC",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "UTC",
      },
    };

    if (attendees && attendees.length > 0) {
      event.attendees = attendees.map((email) => ({ email }));
    }

    if (addGoogleMeet) {
      event.conferenceData = {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      };
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: addGoogleMeet ? 1 : 0,
      sendUpdates: attendees && attendees.length > 0 ? "all" : "none",
    });

    return response.data;
  },

  async updateEvent(
    userId: string,
    eventId: string,
    updates: {
      summary?: string;
      description?: string;
      startDateTime?: string;
      endDateTime?: string;
    }
  ) {
    const calendar = await this.getCalendarClient(userId);

    const event: any = {};
    if (updates.summary) event.summary = updates.summary;
    if (updates.description) event.description = updates.description;
    if (updates.startDateTime) {
      event.start = { dateTime: updates.startDateTime, timeZone: "UTC" };
    }
    if (updates.endDateTime) {
      event.end = { dateTime: updates.endDateTime, timeZone: "UTC" };
    }

    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId,
      requestBody: event,
    });

    return response.data;
  },

  async deleteEvent(userId: string, eventId: string) {
    const calendar = await this.getCalendarClient(userId);

    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });

    return { success: true, message: "Event deleted successfully" };
  },
};
