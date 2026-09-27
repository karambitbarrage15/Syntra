# 🤖 Syntra - Google Calendar Assistant

A production-ready **Fullstack Agentic AI** application built with **Next.js, Node.js, Descope, Mastra & PostgreSQL**. Features an AI-powered Google Calendar assistant that can create, reschedule, cancel, and list meetings through natural language conversation.

## ✨ Features

- 🔐 **Secure Authentication** — Powered by Descope
- 📅 **Google Calendar Integration** — Via Descope Connections
- 🤖 **AI Agent** — Built with Mastra, powered by Google Gemini
- 💬 **Real-time Streaming** — Server-Sent Events for live AI responses
- 💾 **Persistent Chat** — Conversation history stored in PostgreSQL
- 🔌 **MCP Integration** — Expose agent tools to external AI clients
- 🎨 **Modern UI** — Built with shadcn/ui and Tailwind CSS

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) |
| UI | shadcn/ui + Tailwind CSS |
| Auth | Descope |
| Backend | Node.js + Express + TypeScript |
| AI | Mastra + Google Gemini |
| Database | PostgreSQL |
| Protocol | MCP (Model Context Protocol) |

## 📦 Project Structure

```
├── backend/          # Express API server
│   ├── src/
│   │   ├── config/       # Database config
│   │   ├── middleware/    # Auth middleware
│   │   ├── repositories/ # Data access layer
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── mastra/       # AI agent, tools, workflows
│   │   ├── mcp/          # MCP server
│   │   └── migrations/   # SQL migrations
│   └── package.json
├── frontend/         # Next.js client app
│   ├── src/
│   │   ├── app/          # Pages & layouts
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities & API helpers
│   │   └── hooks/        # Custom hooks
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Descope account (free) — [descope.com](https://descope.com)
- Google Gemini API key — [aistudio.google.com](https://aistudio.google.com/apikey)
- Google Cloud project with Calendar API enabled

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/agentic_ai_db
DESCOPE_PROJECT_ID=your_descope_project_id
DESCOPE_MANAGEMENT_KEY=your_descope_management_key
GOOGLE_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Set Up Database

```bash
# Create the database
createdb agentic_ai_db

# Run migrations
cd backend
npm run migrate
```

### 4. Run the App

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔑 External Service Setup

### Descope
1. Create account at [descope.com](https://descope.com)
2. Copy **Project ID** from dashboard
3. Create **Management Key** in Settings → API Keys
4. Set up Google Calendar Connection in Descope Dashboard

### Google Cloud (Calendar)
1. Create project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable **Google Calendar API**
3. Create **OAuth 2.0 credentials**
4. Configure in Descope Connections

### Google Gemini
1. Get API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

## 📝 License

MIT
