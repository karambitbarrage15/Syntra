import Link from "next/link";
import { ArrowRight, Calendar, Bot, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Bot className="size-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Syntra</span>
        </div>
        <Link 
          href="/sign-in"
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 border border-indigo-500/20 backdrop-blur-sm">
          <Zap className="size-4" />
          <span>The next generation of AI scheduling</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Your Agentic Calendar, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Powered by AI.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Syntra connects to your Google Calendar and acts as your personal autonomous agent. Ask it to schedule meetings, find open slots, or summarize your week.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/sign-in"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Get Started
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/karambitbarrage15/Syntra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg border border-slate-800 hover:bg-slate-800 transition-all hover:border-slate-700"
          >
            View GitHub
          </a>
        </div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/80 transition-colors">
            <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
              <Calendar className="size-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Google Calendar Sync</h3>
            <p className="text-slate-400 leading-relaxed">
              Seamlessly connects with your Google Workspace to read, create, and manage your events in real-time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/80 transition-colors">
            <div className="size-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
              <Bot className="size-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Conversational AI</h3>
            <p className="text-slate-400 leading-relaxed">
              Just chat normally. "What does my Tuesday look like?" or "Schedule a 30m sync with Alex tomorrow afternoon."
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/80 transition-colors">
            <div className="size-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
              <Shield className="size-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Secure by Design</h3>
            <p className="text-slate-400 leading-relaxed">
              Powered by Descope for enterprise-grade authentication, ensuring your calendar data stays private.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
