"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, X, RefreshCw } from "lucide-react";
import { calendarApi } from "@/lib/api";

export function CalendarConnect() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const data = await calendarApi.status();
      setConnected(data.connected);
    } catch (error) {
      console.error("Error checking calendar status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await calendarApi.disconnect();
      setConnected(false);
    } catch (error) {
      console.error("Error disconnecting calendar:", error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-6">
          <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle className="text-lg">Google Calendar</CardTitle>
          </div>
          <Badge variant={connected ? "default" : "secondary"}>
            {connected ? (
              <><Check className="h-3 w-3 mr-1" /> Connected</>
            ) : (
              <><X className="h-3 w-3 mr-1" /> Not Connected</>
            )}
          </Badge>
        </div>
        <CardDescription>
          {connected
            ? "Your Google Calendar is connected. The AI agent can manage your meetings."
            : "Connect your Google Calendar to let the AI agent manage your meetings."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connected ? (
          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            Disconnect Calendar
          </Button>
        ) : (
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Connect Google Calendar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
