"use client";

import React, { useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { gsap } from "@/lib/gsap";

export default function PolicyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(".policy-hero-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(".policy-content-block",
          { opacity: 0, y: 35 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".policy-content-block",
              start: "top 85%",
            }
          }
        );

        ScrollTrigger.refresh();
      }, containerRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-background text-white min-h-screen font-sans selection:bg-primary-red selection:text-white relative">
      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10">
        
        <div className="relative z-10 bg-background pt-32 pb-24">
          
          {/* Hero Section */}
          <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full text-center policy-hero-text">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Legal
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight uppercase mt-4 mb-6 leading-none">
              Privacy <span className="text-shadow-glow">Policy</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
              HubSched HRMS & Workspace Management Software. Effective Date: 30 August 2024
            </p>
          </section>

          <SectionCrosses dark={false} />

          {/* Policy Text Section */}
          <section className="policy-content-block py-16 px-6 lg:px-12 max-w-4xl mx-auto w-full">
            <div className="bg-background/[0.01] border border-black/10 rounded-3xl p-8 md:p-12 flex flex-col gap-10 font-sans text-gray-300 text-sm md:text-base leading-relaxed">
              
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  1. Introduction
                </h2>
                <p>
                  Nakshatra Technohub India Pvt. Ltd. is committed to protecting the privacy of our users. This Privacy Policy outlines how we collect, use, and protect your personal information when you use Hubsched Workspace Management Software ("Hubsched").
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  2. Information We Collect
                </h2>
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  <li><strong>Personal Information:</strong> Name, email address, contact number, and other identifying information you provide when registering for or using Hubsched.</li>
                  <li><strong>Usage Data:</strong> Information about your interaction with the software, including log files, IP address, browser type, and other usage details.</li>
                  <li><strong>Device Information:</strong> Data about the device you use to access Hubsched, such as hardware model, operating system, and device identifiers.</li>
                  <li><strong>Location Data:</strong> With your consent, we may collect and use your location information to provide certain features, such as off-site tracking.</li>
                  <li><strong>Camera Access:</strong> With your consent, we may access your device's camera for specific features like claiming expenses, where image capture is required.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="mb-4">We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  <li><strong>To Provide and Improve Our Services:</strong> We use your data to operate, maintain, and enhance the functionality of Hubsched.</li>
                  <li><strong>To Communicate with You:</strong> We may send you updates, promotional materials, and information about your account.</li>
                  <li><strong>For Security Purposes:</strong> We use the information to protect against fraud, unauthorized access, and other security risks.</li>
                  <li><strong>Location-Based Features:</strong> Your location data is used for specific features like off-site tracking to enhance your experience and ensure the proper functioning of our services.</li>
                  <li><strong>Camera-Based Features:</strong> We use camera access for features such as claiming expenses, allowing you to capture and submit necessary images.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  4. Sharing of Information
                </h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our software, conducting our business, or servicing you, provided that those parties agree to keep this information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  5. Data Security
                </h2>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  6. Your Rights
                </h2>
                <p>
                  You have the right to access, correct, or delete your personal information. You can also request that we limit the processing of your data or object to certain types of processing. You can manage your location data and camera access preferences through your device settings.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  7. Cookies
                </h2>
                <p>
                  Hubsched may use cookies to enhance your experience. Cookies are small files stored on your device that help us recognize you and remember your preferences. You can manage your cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  8. User Consent
                </h2>
                <p>
                  We obtain your explicit consent before collecting any personal information, including location data and camera access. You have the option to withdraw your consent at any time by adjusting your device settings or contacting us directly.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  9. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the date at the top will be updated accordingly. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                </p>
              </div>

              <div className="mt-6 pt-8 border-t border-black/10">
                <h2 className="text-xl md:text-2xl font-bold text-primary-red uppercase tracking-tight mb-6">
                  Contact Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-bold text-white mb-1">Company</h4>
                    <p className="text-gray-600">Nakshatra Technohub India Pvt. Ltd.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Address</h4>
                    <p className="text-gray-600">Plot Number F-89, MIDC, AMBAD<br />Nashik, Maharashtra, India</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@hubsched.com" className="hover:text-primary-red">info@hubsched.com</a><br />
                      <a href="mailto:info@nakshatratechnohub.com" className="hover:text-primary-red">info@nakshatratechnohub.com</a>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+918482925926" className="hover:text-primary-red">+91 8482925926</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <SectionCrosses dark={false} />

        </div>

        <PremiumFooter />
      </div>
    </main>
  );
}
