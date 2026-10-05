import Link from "next/link";
import { Bot, Calendar, CalendarClock, MessageSquare, Globe, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans selection:bg-white/30">
      
      {/* SECTION 1: HERO (Image Background) */}
      <section 
        className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-12 px-6 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')" }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Top Navbar */}
        <nav className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20 text-white w-full max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <Bot className="size-8 stroke-1" />
            <span className="text-2xl font-medium tracking-wide">Syntra <br/><span className="text-sm font-light opacity-80">AI Assistant</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-light">
            <a href="#" className="hover:underline underline-offset-4">Home</a>
            <a href="#" className="hover:underline underline-offset-4 opacity-70">Features</a>
            <a href="#" className="hover:underline underline-offset-4 opacity-70">About us</a>
          </div>
        </nav>

        {/* Left Sidebar Menu */}
        <div className="hidden lg:flex absolute left-8 top-1/3 flex-col gap-3 z-20 w-48">
          <button className="px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white text-sm font-light backdrop-blur-md text-left hover:bg-white/20 transition">
            Your schedule
          </button>
          <button className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm font-light backdrop-blur-md text-left hover:bg-white/10 hover:text-white transition">
            Smart calendar
          </button>
          <button className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm font-light backdrop-blur-md text-left hover:bg-white/10 hover:text-white transition">
            Communicate
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center text-center mt-12 md:mt-24 max-w-4xl text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-tight mb-6 drop-shadow-lg">
            Connect your calendar <br/>
            to start scheduling now
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mb-12 drop-shadow-md">
            For every meeting you schedule, our AI agent will save you hours of back-and-forth. <br/>
            You can help streamline your daily workflow every day.
          </p>

          {/* Action "Timer-like" Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            <div className="flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-white/30 backdrop-blur-md bg-black/10 transition-all duration-300">
              <span className="text-3xl md:text-4xl font-light">1</span>
              <span className="text-xs font-light opacity-80 uppercase tracking-widest mt-1">Sync</span>
            </div>
            <div className="flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-white/30 backdrop-blur-md bg-black/10 transition-all duration-300">
              <span className="text-3xl md:text-4xl font-light">2</span>
              <span className="text-xs font-light opacity-80 uppercase tracking-widest mt-1">Chat</span>
            </div>
            <Link href="/sign-in" className="flex flex-col items-center justify-center w-28 h-32 md:w-32 md:h-36 rounded-2xl border-2 border-white bg-white text-slate-900 shadow-xl hover:scale-105 transition-transform duration-300 group cursor-pointer -mt-4">
              <span className="text-4xl md:text-5xl font-light">GO</span>
              <span className="text-xs font-bold uppercase tracking-widest mt-2 text-slate-500 group-hover:text-slate-800 transition-colors">Sign In</span>
            </Link>
            <div className="flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-white/30 backdrop-blur-md bg-black/10 transition-all duration-300">
              <span className="text-3xl md:text-4xl font-light">3</span>
              <span className="text-xs font-light opacity-80 uppercase tracking-widest mt-1">Relax</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section 1 */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20 text-white font-light text-sm">
          <div>
            <p>Total events scheduled: <strong className="font-medium">8,469</strong></p>
            <p>Hours saved worldwide: <strong className="font-medium">21,050</strong></p>
          </div>
          <div className="hidden md:block opacity-60">
            Copyright © 2026 Syntra
          </div>
        </div>
      </section>

      {/* SECTION 2: DARK MODE (Dot Matrix Calendar) */}
      <section id="how-to-use" className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-24 px-6 lg:px-24 bg-[#1e1e1e]">
        
        {/* Left Sidebar Menu */}
        <div className="hidden lg:flex absolute left-8 top-1/3 flex-col gap-3 z-20 w-48">
          <button className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm font-light text-left hover:bg-white/10 hover:text-white transition">
            Your schedule
          </button>
          <button className="px-4 py-2 rounded-full border border-cyan-400 bg-cyan-400/10 text-cyan-400 text-sm font-light text-left hover:bg-cyan-400/20 transition">
            Smart calendar
          </button>
          <button className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm font-light text-left hover:bg-white/10 hover:text-white transition">
            Communicate
          </button>
          
          <div className="mt-12 flex flex-col gap-3">
            <button className="px-4 py-1.5 rounded-full border border-white/20 text-white/70 text-xs font-light text-left hover:bg-white/10 transition">
              + Zoom in
            </button>
            <button className="px-4 py-1.5 rounded-full border border-white/20 text-white/70 text-xs font-light text-left hover:bg-white/10 transition">
              - Zoom out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center text-center mt-12 w-full max-w-5xl text-white">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide leading-tight mb-16 text-[#e0e0e0]">
            How to Use Syntra <br/> <span className="text-2xl opacity-70">See your smart calendar organize your world</span>
          </h2>

          {/* 3 Step Instruction Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mb-16 px-4">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
              <div className="size-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-6">
                <Calendar className="text-cyan-400 size-6 stroke-1" />
              </div>
              <h3 className="text-2xl font-light mb-3">1. Connect</h3>
              <p className="text-sm font-light text-white/70 leading-relaxed">
                Sign in with your Google account. We securely connect to your calendar so Syntra knows when you are busy.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
              <div className="size-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                <MessageSquare className="text-purple-400 size-6 stroke-1" />
              </div>
              <h3 className="text-2xl font-light mb-3">2. Chat</h3>
              <p className="text-sm font-light text-white/70 leading-relaxed">
                Just chat with the AI! Ask it to "schedule a 30m sync on Tuesday" or "what does my tomorrow look like?"
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
              <div className="size-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                <CalendarClock className="text-emerald-400 size-6 stroke-1" />
              </div>
              <h3 className="text-2xl font-light mb-3">3. Relax</h3>
              <p className="text-sm font-light text-white/70 leading-relaxed">
                Syntra does the heavy lifting. It finds the perfect time slot and books the event instantly on your behalf.
              </p>
            </div>
          </div>

          {/* Dot Matrix Calendar Graphic */}
          <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto flex flex-col gap-2 p-8 mb-20">
            {/* Generating a dot matrix grid mimicking a calendar layout */}
            <div className="grid grid-cols-7 gap-4 w-full h-full">
              {/* Days of week header */}
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="text-center text-xs font-mono text-cyan-500/50 mb-4">{day}</div>
              ))}
              
              {/* Calendar Grid (35 days) */}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="relative w-full aspect-square flex flex-col gap-1 p-1">
                  {/* The dot matrix inside each day */}
                  <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full opacity-60">
                    {Array.from({ length: 16 }).map((_, j) => {
                      // Randomly light up some dots in cyan to simulate busy times
                      const isBusy = (i * j) % 7 === 3 || (i + j) % 11 === 0;
                      return (
                        <div 
                          key={j} 
                          className={`w-full h-full rounded-full transition-all duration-1000 ${
                            isBusy ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-[#333333]'
                          }`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Floating tooltip on a specific day (mimicking the London tooltip in the ref) */}
                  {i === 17 && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs py-2 px-3 rounded-md shadow-xl flex flex-col items-center z-30 whitespace-nowrap">
                      <strong className="font-bold">Next Meeting</strong>
                      <span>3 participants</span>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#111111] text-white/50 py-16 mt-12 px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-light border-t border-white/5">
        <div className="flex items-center gap-2 opacity-80">
          <Bot className="size-5" />
          <span>Syntra AI © 2026. All rights reserved.</span>
        </div>
        <div className="flex gap-8">
          <a href="#how-to-use" className="hover:text-white transition">How to Use</a>
          <a href="mailto:chaturvediaditya6768@gmail.com" className="hover:text-white transition">Contact Us</a>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/karambitbarrage15" target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 transition border border-white/10">GitHub</a>
          <a href="https://www.linkedin.com/in/aditya-chaturvedi-521a24277/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 transition border border-white/10">LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}
