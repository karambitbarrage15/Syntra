"use client";

import { CalendarConnect } from "@/components/calendar/calendar-connect";
import { ChatPanel } from "@/components/chat/chat-panel";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <CalendarConnect />
      <ChatPanel />
    </div>
  );
}
