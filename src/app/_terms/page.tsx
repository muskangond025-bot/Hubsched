"use client";

import React, { useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SectionCrosses } from "@/components/sections/SectionCrosses";
import { PremiumFooter } from "@/components/sections/PremiumFooter";
import { gsap } from "@/lib/gsap";

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(".terms-hero-text",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(".terms-content-block",
          { opacity: 0, y: 35 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".terms-content-block",
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
          <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full text-center terms-hero-text">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Legal
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight uppercase mt-4 mb-6 leading-none">
              Terms & <span className="text-shadow-glow">Conditions</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
              HubSched HRMS & Workspace Management Software. Effective Date: 1st January 2024
            </p>
          </section>

          <SectionCrosses dark={false} />

          {/* Terms Text Section */}
          <section className="terms-content-block py-16 px-6 lg:px-12 max-w-4xl mx-auto w-full">
            <div className="bg-background/[0.01] border border-black/10 rounded-3xl p-8 md:p-12 flex flex-col gap-10 font-sans text-gray-300 text-sm md:text-base leading-relaxed">
              
              <p className="lead text-white font-medium text-lg">
                Welcome to Hubsched, a workspace management software provided by Nakshatra Technohub India Pvt. Ltd. These Terms and Conditions govern your use of the Hubsched platform and its related services.
              </p>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using Hubsched, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, you must discontinue the use of the platform immediately.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  2. User Registration
                </h2>
                <p>
                  To access certain features, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  3. Permitted Use
                </h2>
                <p className="mb-4">
                  Hubsched provides workspace management and HRMS solutions, including attendance tracking, off-site monitoring, and more. You agree to use the platform solely for its intended purposes, and you shall not:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  <li>Interfere with the platform's normal operation.</li>
                  <li>Use the software for illegal activities or in violation of applicable laws.</li>
                  <li>Access unauthorized parts of the platform or attempt to gain access to data without permission.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  4. User Permissions and Data
                </h2>
                <p>
                  Hubsched collects user data to provide essential services. This includes user location for off-site tracking and access to the camera for features like expense claims. All permissions are collected with explicit user consent, and you agree to the collection and use of such data in accordance with Hubsched's Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  5. Privacy Policy
                </h2>
                <p>
                  Hubsched is committed to protecting your privacy. Please review our <a href="/policy" className="text-primary-red font-bold hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your personal information.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  6. Subscription and Payment Terms
                </h2>
                <p>
                  Certain features of Hubsched may require a paid subscription. By subscribing, you agree to pay the applicable fees. Subscription plans and pricing details are outlined on our website and may change over time. Cancellations and refunds are governed by our refund policy, available on our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  7. Intellectual Property
                </h2>
                <p>
                  All content and software within Hubsched, including logos, trademarks, and other proprietary materials, are the intellectual property of Nakshatra Technohub India Pvt. Ltd. You may not reproduce, distribute, or otherwise use Hubsched's intellectual property without explicit written consent.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  8. Third-Party Services
                </h2>
                <p>
                  Hubsched may integrate or link with third-party services. Nakshatra Technohub India Pvt. Ltd. is not responsible for the content, functionality, or terms of use of these third-party services. Your use of these services is subject to their own terms and policies.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="mb-4">
                  <strong>Important Notice:</strong> Hubsched is provided on an "as is" and "as available" basis. Nakshatra Technohub India Pvt. Ltd. makes no guarantees regarding the availability, accuracy, or reliability of the platform.
                </p>
                <p>
                  We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  10. Modification of Terms
                </h2>
                <p>
                  Nakshatra Technohub India Pvt. Ltd. reserves the right to modify these Terms and Conditions at any time. Changes will be posted on the Hubsched website or communicated through other appropriate channels. Continued use of the platform after such changes constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  11. Termination
                </h2>
                <p>
                  We reserve the right to suspend or terminate your access to Hubsched if you violate these Terms and Conditions or engage in harmful or unlawful activities.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  12. Governing Law
                </h2>
                <p>
                  These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes related to the platform shall be subject to the exclusive jurisdiction of the courts of Nashik, Maharashtra.
                </p>
              </div>

              <div className="mt-6 pt-8 border-t border-black/10">
                <h2 className="text-xl md:text-2xl font-bold text-primary-red uppercase tracking-tight mb-6">
                  Contact Information
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
