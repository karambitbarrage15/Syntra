const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const sessionToken = getSessionToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (sessionToken) {
    headers.Authorization = `Bearer ${sessionToken}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return response;
}

function getSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  return (window as any).__descope_session_token || null;
}

export function setSessionToken(token: string) {
  if (typeof window !== "undefined") {
    (window as any).__descope_session_token = token;
  }
}

// User APIs
export const userApi = {
  sync: () => fetchWithAuth("/api/users/sync", { method: "POST" }).then((r) => r.json()),
  me: () => fetchWithAuth("/api/users/me").then((r) => r.json()),
};

// Calendar APIs
export const calendarApi = {
  status: () => fetchWithAuth("/api/calendar/status").then((r) => r.json()),
  connect: (tokens: { accessToken: string; refreshToken: string; expiresAt: string }) =>
    fetchWithAuth("/api/calendar/connect", {
      method: "POST",
      body: JSON.stringify(tokens),
    }).then((r) => r.json()),
  refresh: (tokens: { accessToken: string; expiresAt: string }) =>
    fetchWithAuth("/api/calendar/refresh", {
      method: "POST",
      body: JSON.stringify(tokens),
    }).then((r) => r.json()),
  disconnect: () =>
    fetchWithAuth("/api/calendar/disconnect", { method: "POST" }).then((r) => r.json()),
  events: (maxResults?: number) =>
    fetchWithAuth(`/api/calendar/events?maxResults=${maxResults || 10}`).then((r) => r.json()),
};

// Agent APIs
export const agentApi = {
  getConversations: () =>
    fetchWithAuth("/api/agent/conversations").then((r) => r.json()),
  createConversation: (title?: string) =>
    fetchWithAuth("/api/agent/conversations", {
      method: "POST",
      body: JSON.stringify({ title }),
    }).then((r) => r.json()),
  getMessages: (conversationId: string) =>
    fetchWithAuth(`/api/agent/conversations/${conversationId}/messages`).then((r) => r.json()),
  deleteConversation: (conversationId: string) =>
    fetchWithAuth(`/api/agent/conversations/${conversationId}`, {
      method: "DELETE",
    }).then((r) => r.json()),
  chat: (message: string, conversationId?: string) => {
    const sessionToken = getSessionToken();
    return fetch(`${API_URL}/api/agent/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ message, conversationId }),
    });
  },
};
