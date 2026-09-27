import { Mastra } from "@mastra/core";
import { calendarAgent } from "./agents/calendar-agent";
import dotenv from "dotenv";

dotenv.config();

export const mastra = new Mastra({
  agents: {
    calendarAgent,
  },
});
