"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  // Testimonial Carousel state
  const quotes = [
    "HubSched makes scheduling effortless and keeps our team perfectly synchronized.",
    "The best scheduling platform with amazing features and support.",
    "Clean interface, powerful features, exactly what we needed!"
  ];
  const [activeQuote, setActiveQuote] = useState(0);

  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error/Success validation states
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cycle testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  // Input validation helper
  const detectInputType = (val: string) => {
    val = val.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(val)) return "email";

    const mobileRegex = /^\d+$/;
    if (mobileRegex.test(val)) return "mobile";

    if (val.includes("@")) return "email";
    return "unknown";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string) => {
    // Indian 10-digit mobile number format starting with 6-9
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setSuccessMessage("");

    const userVal = username.trim();
    
    // Validate username
    if (userVal === "") {
      setUsernameError("Please enter your email or mobile number");
      return;
    }

    const inputType = detectInputType(userVal);
    if (inputType === "email") {
      if (!validateEmail(userVal)) {
        setUsernameError("Please enter a valid email address");
        return;
      }
    } else if (inputType === "mobile") {
      if (!validateMobile(userVal)) {
        setUsernameError("Please enter a valid 10-digit mobile number");
        return;
      }
    } else {
      setUsernameError("Please enter a valid email or 10-digit mobile number");
      return;
    }

    // Validate password
    if (password === "") {
      setPasswordError("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (password.length > 12) {
      setPasswordError("Password must not exceed 12 characters");
      return;
    }

    // Success login mock response
    setSuccessMessage("Sign in successful! Redirecting to dashboard...");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#5b60f6] flex items-center justify-center p-6 md:p-12 font-sans selection:bg-[#5b60f6] selection:text-white">
      <div className="w-full max-w-5xl bg-background rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Column: Quote Slider Visual Panel */}
        <div className="lg:col-span-6 relative bg-gradient-to-br from-[#3b40c6] to-[#5b60f6] p-8 md:p-12 flex flex-col justify-between text-white overflow-hidden min-h-[400px] lg:min-h-full">
          {/* Subtle background overlay image pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)] pointer-events-none" />
          <div 
            className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')` }}
          />

          {/* Logo Brand Header */}
          <div className="relative z-10 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-[#5b60f6] font-bold shadow-md">
                H
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">HubSched</span>
            </Link>
          </div>

          {/* Testimonial Quote Slider */}
          <div className="relative z-10 mt-auto flex flex-col items-start gap-6">
            {/* Quote Icon */}
            <div className="text-teal-400 text-6xl font-serif leading-none select-none">
              “
            </div>

            {/* Cycler message */}
            <div className="min-h-[80px] w-full transition-all duration-500">
              <p className="text-lg md:text-xl font-medium font-sans leading-relaxed text-white/90 italic">
                {quotes[activeQuote]}
              </p>
            </div>

            {/* Slider dot indicators */}
            <div className="flex gap-2.5 mt-2">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuote(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeQuote ? "bg-background w-6" : "bg-background/40"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form Panel */}
        <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-background text-gray-800">
          
          <div className="w-full max-w-md mx-auto">
            
            {/* Form Title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                Welcome Back!
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Sign in to continue to HubSched.
              </p>
            </div>

            {/* Success message banner */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {successMessage}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Field 1: Email or Mobile */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError("");
                  }}
                  placeholder="Enter email or mobile number"
                  className={`w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 text-sm font-medium transition-all duration-300 focus:outline-none focus:bg-background focus:ring-2 ${
                    usernameError
                      ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                      : "border-slate-200 focus:ring-[#5b60f6]/20 focus:border-[#5b60f6]"
                  }`}
                  autoFocus
                />
                {usernameError && (
                  <span className="text-xs font-bold text-red-500 mt-1 flex items-center gap-1">
                    {usernameError}
                  </span>
                )}
              </div>

              {/* Field 2: Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  <a
                    href="https://app.hubsched.com/auth/web/forgot-password/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-400 hover:text-[#5b60f6] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter password"
                    className={`w-full pl-4 pr-12 py-3.5 rounded-xl border bg-slate-50/50 text-sm font-medium transition-all duration-300 focus:outline-none focus:bg-background focus:ring-2 ${
                      passwordError
                        ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                        : "border-slate-200 focus:ring-[#5b60f6]/20 focus:border-[#5b60f6]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {passwordError && (
                  <span className="text-xs font-bold text-red-500 mt-1 flex items-center gap-1">
                    {passwordError}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-4 bg-[#5b60f6] hover:bg-[#484cc7] text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-lg shadow-[#5b60f6]/30 hover:scale-[1.01] hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </button>

            </form>

            {/* Footer copyright within card */}
            <div className="mt-12 text-center text-xs font-semibold text-slate-400">
              © {new Date().getFullYear()} HubSched. Crafted with ❤️ by{" "}
              <a
                href="https://nakshatratechnohub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#5b60f6] transition-colors"
              >
                Nakshatra Technohub
              </a>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
