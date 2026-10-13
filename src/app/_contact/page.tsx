"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Faq } from "@/components/sections/Faq";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { SectionCrosses } from "@/components/sections/SectionCrosses";

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["WEB DESIGN", "WEBFLOW"]);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(14); // July 14, 2026 as highlighted active day

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaChecked) {
      alert("Please verify that you are not a robot.");
      return;
    }
    alert("Inquiry submitted successfully! Thank you for reaching out.");
  };

  // Calendar parameters for July 2026 (Starts on a Wednesday)
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const daysInJuly = 31;
  const julyStartOffset = 3; // Wednesday offset in a 0-indexed week (Sun=0, Mon=1, Tue=2, Wed=3)

  // Generate grid calendar cells
  const calendarCells = [];
  for (let i = 0; i < julyStartOffset; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInJuly; i++) {
    calendarCells.push(i);
  }

  return (
    <main className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10 pt-20 md:pt-28">
        
        {/* Main Interactive Contact Section */}
        <section className="w-full pb-8 md:pb-16">
          <div className="padding-global">
            <div className="container-large">
              
              {/* Outer Card Frame with Outline Border and ruler */}
              <div 
                className="w-full rounded-[2.5rem] md:rounded-[3.5rem] border border-black/10 p-6 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 relative overflow-hidden bg-[#151618]"
                style={{ boxShadow: "0 30px 60px -15px rgba(0,0,0,0.8)" }}
              >
                {/* Visual Corners */}
                <div className="corners absolute inset-0 pointer-events-none">
                  <div className="frame-corner border-white opacity-20"></div>
                  <div className="frame-corner is--2 border-white opacity-20"></div>
                  <div className="frame-corner is--3 border-white opacity-20"></div>
                  <div className="frame-corner is--4 border-white opacity-20"></div>
                </div>

                {/* Top horizontal Ruler decoration */}
                <div className="absolute top-0 left-0 w-full h-[12px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px] border-b border-black/5 opacity-50" />

                {/* Left Side: Contact Prompt & Dynamic Calendar */}
                <div className="flex-1 flex flex-col justify-start gap-8 relative z-10 lg:pr-10">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <h1 className="font-humane text-7xl md:text-8xl lg:text-[7.5vw] leading-[0.8] uppercase select-none tracking-tight">
                        CONTACT
                      </h1>
                      <div className="w-10 h-10 rounded-full bg-[#ffd600]/10 border border-[#ffd600]/30 flex items-center justify-center text-[#ffd600] font-mono text-xl font-bold select-none">
                        +
                      </div>
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-gray-600 font-sans max-w-md">
                      Let's start with a quick hello to discuss your project goals, needs, and challenges. I'll answer any questions about my process, and we'll outline the next steps. Looking forward to connecting!
                    </p>
                  </div>

                  {/* Interactive Calendar Invite Mockup */}
                  <div className="w-full max-w-[380px] bg-background rounded-3xl border border-black/5 p-6 flex flex-col gap-4 self-start">
                    <div className="flex justify-between items-center border-b border-black/5 pb-3">
                      <span className="text-xs font-bold font-mono tracking-widest text-gray-600">July 2026</span>
                      <div className="flex gap-2">
                        <button className="w-6 h-6 rounded border border-black/10 flex items-center justify-center text-xs hover:bg-background/5">&lt;</button>
                        <button className="w-6 h-6 rounded border border-black/10 flex items-center justify-center text-xs hover:bg-background/5">&gt;</button>
                      </div>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {daysOfWeek.map(day => (
                        <div key={day} className="text-[9px] font-bold font-mono text-gray-600">{day}</div>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-xs font-mono">
                      {calendarCells.map((day, idx) => {
                        if (day === null) {
                          return <div key={`empty-${idx}`} />;
                        }
                        const isSelected = selectedDate === day;
                        return (
                          <div 
                            key={`day-${day}`}
                            onClick={() => setSelectedDate(day)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? "bg-[#ffd600] text-black font-bold scale-115" 
                                : "text-gray-600 hover:bg-background/5 hover:text-white"
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Side: Interactive Inquiry Form */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8 relative z-10 w-full">
                  
                  {/* Name Fields Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="font-heading text-[10px] tracking-[0.2em] text-gray-600 uppercase">FIRST NAME</label>
                      <input 
                        type="text" 
                        placeholder="John" 
                        required
                        className="border-b border-black/10 bg-transparent py-2.5 text-sm font-sans focus:outline-none focus:border-[#ffd600] transition-colors w-full text-white placeholder-gray-600"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-heading text-[10px] tracking-[0.2em] text-gray-600 uppercase">LAST NAME</label>
                      <input 
                        type="text" 
                        placeholder="Doe" 
                        required
                        className="border-b border-black/10 bg-transparent py-2.5 text-sm font-sans focus:outline-none focus:border-[#ffd600] transition-colors w-full text-white placeholder-gray-600"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-heading text-[10px] tracking-[0.2em] text-gray-600 uppercase">EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required
                      className="border-b border-black/10 bg-transparent py-2.5 text-sm font-sans focus:outline-none focus:border-[#ffd600] transition-colors w-full text-white placeholder-gray-600"
                    />
                  </div>

                  {/* Budget Field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-heading text-[10px] tracking-[0.2em] text-gray-600 uppercase">BUDGET</label>
                    <input 
                      type="text" 
                      placeholder="$5,000 - $12,000" 
                      required
                      className="border-b border-black/10 bg-transparent py-2.5 text-sm font-sans focus:outline-none focus:border-[#ffd600] transition-colors w-full text-white placeholder-gray-600"
                    />
                  </div>

                  {/* Service Toggle Pills */}
                  <div className="flex flex-col gap-4">
                    <label className="font-heading text-[10px] tracking-[0.2em] text-gray-600 uppercase">SERVICE REQUIRED</label>
                    <div className="flex flex-wrap gap-2.5">
                      {["WEB DESIGN", "WEBFLOW", "PRODUCT DESIGN"].map(service => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`px-5 py-2.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 ${
                              isSelected 
                                ? "bg-background border-white font-bold" 
                                : "border-white/15 bg-background/[0.02] hover:bg-background/5 hover:border-black/20 text-gray-600"
                            }`}
                            style={{ color: isSelected ? '#101010' : '#8c8c8c' }}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-heading text-[10px] tracking-[0.2em] text-gray-600 uppercase">MESSAGE</label>
                    <textarea 
                      rows={3}
                      placeholder="Your message" 
                      required
                      className="border-b border-black/10 bg-transparent py-2.5 text-sm font-sans focus:outline-none focus:border-[#ffd600] transition-colors w-full text-white placeholder-gray-600 resize-none"
                    />
                  </div>

                  {/* mock reCAPTCHA */}
                  <div className="flex items-center justify-between p-4 bg-background border border-black/5 rounded-2xl w-fit gap-8 mt-2 select-none">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={recaptchaChecked}
                        onChange={(e) => setRecaptchaChecked(e.target.checked)}
                        className="w-5 h-5 rounded border border-black/20 bg-transparent checked:bg-[#ffd600] checked:border-[#ffd600] focus:ring-0 text-[#101010] cursor-pointer"
                      />
                      <span className="text-xs font-sans text-gray-300">I'm not a robot</span>
                    </label>
                    <div className="flex flex-col items-center justify-center opacity-80">
                      <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-6 h-6" alt="reCAPTCHA logo" />
                      <span className="text-[7px] font-sans text-gray-600 uppercase tracking-widest mt-1">reCAPTCHA</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="flex items-center gap-4 group pointer-events-auto self-start mt-4"
                  >
                    <div className="px-8 py-3 rounded-full border border-black/20 text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 group-hover:bg-background group-hover:text-black group-hover:border-white">
                      SUBMIT
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#ffd600] flex items-center justify-center text-black transform group-hover:rotate-45 transition-transform duration-300 shadow-md">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </button>

                </form>

              </div>
            </div>
          </div>
        </section>

        <SectionCrosses dark={false} />

        {/* FAQ list section matching live contact layout */}
        <Faq />

        <PremiumFooter />
      </div>
    </main>
  );
}
