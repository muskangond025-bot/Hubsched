"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const faqs = [
  {
    category: "Onboarding",
    question: "How long does the implementation process take?",
    answer: "The implementation timeline depends on the package and modules selected. For essential modules like Attendance, setup can begin within 15 days. More advanced modules may require additional configuration and hardware setup."
  },
  {
    category: "Training",
    question: "Do you provide training for employees?",
    answer: "Yes. We provide complete employee and admin training on how to use the application effectively and avoid errors. We also offer videos, tutorials, and continuous support."
  },
  {
    category: "Support",
    question: "What type of support do you provide after onboarding?",
    answer: "You receive a dedicated support team to help with queries, troubleshooting, and updates via call, WhatsApp, and email."
  },
  {
    category: "Pricing",
    question: "What is the pricing structure of HubSched?",
    answer: "Hubsched provides a set of well-defined Standard Subscription Plans designed to meet the core operational needs of modern organizations. Standard plan pricing begins at ₹70 per employee per month. For enterprises with specialized or advanced deployment needs, Hubsched also offers a custom pricing model, available upon consultation."
  },
  {
    category: "Modules",
    question: "Is there any minimum module requirement?",
    answer: "No. You can start with only the modules you need and add more anytime as your business grows."
  },
  {
    category: "Hardware",
    question: "What hardware is required for attendance tracking?",
    answer: "Hardware depends on the attendance method: GPS/Geofencing requires no hardware, QR Code requires only a mobile phone, and biometric systems require specific hardware. Our team will guide you based on your setup."
  },
  {
    category: "Meeting Rooms",
    question: "How does QR-Based Meeting Room Management work?",
    answer: "Users can check meeting room availability and book a room directly through the HubSched app by selecting the desired date, time, and guests. After booking, invited attendees can scan the QR code placed at the meeting room door to verify the booking and enter. The system uses encrypted QR codes, user authentication, and access controls for security."
  },
  {
    category: "Meeting Rooms",
    question: "How many employees and meeting rooms can HubSched manage?",
    answer: "HubSched can efficiently manage unlimited employees and meeting rooms. The platform is designed for seamless scalability."
  },
  {
    category: "Platforms",
    question: "On which platforms does HubSched work?",
    answer: "HubSched is available on Android, iOS, and Web dashboard, providing seamless access across all your devices."
  },
  {
    category: "Logs",
    question: "Does HubSched provide an activity log?",
    answer: "Yes. The system maintains a comprehensive activity log for tracking user actions and system events, ensuring full transparency and accountability."
  },
  {
    category: "Customization",
    question: "Is customization available for specific organizational needs?",
    answer: "Yes. HubSched offers customization options based on your workflow and operational requirements to perfectly fit your organization's needs."
  },
  {
    category: "Support",
    question: "Does HubSched offer on-site technical support?",
    answer: "Yes. We offer dedicated on-site technical support when required to ensure smooth operations."
  },
  {
    category: "Security",
    question: "How secure is company data on HubSched?",
    answer: "Data security is our top priority. HubSched ensures end-to-end encryption, secure cloud storage, access controls, and regular security audits. Your data remains fully protected at every stage."
  },
  {
    category: "Security",
    question: "How secure are digital passes in HubSched?",
    answer: "Digital passes use a robust security protocol. Attendee photos, mobile numbers, and QR access codes are securely sent via SMS and email, ensuring confidential and tamper-proof access."
  },
  {
    category: "Integration",
    question: "How does IoT integration improve HubSched's functionality?",
    answer: "HubSched uses IoT-enabled hardware to automate office systems such as access control, meeting room equipment, and device operations, providing secure and efficient automation."
  },
  {
    category: "Domains",
    question: "Is a domain email ID mandatory to use HubSched?",
    answer: "Yes. A domain-based email ID is required for secure organizational access and verification."
  },
  {
    category: "Onboarding",
    question: "How long does employee onboarding take?",
    answer: "Basic onboarding can be completed in 1–3 days, depending on the number of employees and modules selected."
  },
  {
    category: "Servers",
    question: "Is HubSched cloud-based? Do we need servers?",
    answer: "HubSched is 100% cloud-based and requires no additional servers unless biometric hardware is used. This ensures easy deployment and maintenance."
  }
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLImageElement>(null);

  // Accordion Expand/Collapse Animations
  useEffect(() => {
    dropdownRefs.current.forEach((el, index) => {
      if (!el) return;
      const isOpen = openIndex === index;
      
      gsap.to(el, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: isOpen ? "power2.out" : "power2.inOut"
      });
      
      const iconEl = iconRefs.current[index];
      if (iconEl) {
        gsap.to(iconEl, {
          rotate: isOpen ? 45 : 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  }, [openIndex]);

  // Pupil Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!leftPanelRef.current || !pupilRef.current) return;
      
      const rect = leftPanelRef.current.getBoundingClientRect();
      
      // Calculate center coordinates of the eye graphic inside the panel
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      const angle = Math.atan2(dy, dx);
      // Constraint translation within a 22px radius
      const distance = Math.min(Math.hypot(dx, dy), 22); 
      
      const tx = distance * Math.cos(angle);
      const ty = distance * Math.sin(angle);
      
      gsap.to(pupilRef.current, {
        x: tx,
        y: ty,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="section-faq-wrap w-full relative">
      <div id="faq" className="section-faq w-full relative">
        <div className="padding-global">
          <div className="container-large">
            <div className="faq-padding">
              <div className="faq-inner flex flex-col lg:flex-row items-stretch">
                
                {/* Left Side: Interactive Eye Graphic */}
                <div ref={leftPanelRef} className="faq-left relative overflow-hidden flex-shrink-0 aspect-square lg:aspect-auto">
                  
                  {/* Eye graphic frames */}
                  <div className="image-container is--faq">
                    <img 
                      src="/image-frame-main.svg" 
                      loading="lazy" 
                      alt="Eye Graphic Frame" 
                      className="vector-image"
                    />
                    <div className="eye-wrapper">
                      <img 
                        src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c88077e9c777f1eed3224f_eye-new.svg" 
                        loading="lazy" 
                        alt="Eye Frame Shape" 
                        className="eye-vector"
                      />
                      <img 
                        ref={pupilRef}
                        src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c88077c922577248f41258_pupil.svg" 
                        loading="lazy" 
                        alt="Pupil Follower" 
                        className="pupil-vector"
                      />
                    </div>
                  </div>

                  {/* Grid background wrap */}
                  <div className="background-grid-wrapper">
                    <img 
                      src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c880774b52bc873ce2eb61_outer-grid-bigger.svg" 
                      loading="lazy" 
                      alt="Background Grid" 
                      className="background-grid-image"
                    />
                  </div>

                </div>

                {/* Center Spine Element */}
                <div className="line-block flex flex-col items-center">
                  <div className="square-block is--faq">
                    <div className="icon-embed-small w-embed">
                      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.7734 22.3427L41.9995 20.9997L33.7734 19.6573C27.9031 18.6985 23.3015 14.0964 22.3427 8.22612L20.9997 0L19.6567 8.22612C18.6985 14.0964 14.0964 18.6985 8.22612 19.6573L0 20.9997L8.22612 22.3427C14.0964 23.301 18.6985 27.9031 19.6567 33.7739L20.9997 42L22.3427 33.7739C23.3015 27.9031 27.9031 23.301 33.7734 22.3427Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className="vertical-line">
                    <div className="text-size-xxsmall is--rotated text-[#1b1c1e] font-semibold uppercase">
                      FREQUENTLY ASKED QUESTIONS
                    </div>
                  </div>
                </div>

                {/* Right Side: Accordion Questions list */}
                <div data-reveal-group="" className="faq-right flex flex-col">
                  
                  {/* Top Header details */}
                  <div className="faq-top">
                    <h2 className="heading-style-h2 is--larger text-shadow-glow">QUESTIONS?</h2>
                    <p className="text-size-regular text-color-secondary mt-4 leading-relaxed">
                      Here are some answers to frequently asked questions about my design process, services, and areas of expertise.
                    </p>
                  </div>

                  {/* Dropdown accordion wrappers */}
                  <div className="dropdown-accordion-wrap flex flex-col mt-8">
                    {faqs.map((faq, index) => {
                      const isOpen = openIndex === index;
                      
                      return (
                        <div 
                          key={index} 
                          className="dropdown-accordion cursor-pointer border-b border-[#2e2e2e]"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                          
                          {/* Accordion header click wrapper */}
                          <div className="dropdown-top flex justify-between items-center py-6">
                            <h3 className="heading-style-h3 text-white text-3xl font-heading uppercase">
                              {faq.category}
                            </h3>
                            <div className="max-width-medium flex-1 px-8 hidden md:block">
                              <p className="text-size-small text-gray-600 font-sans leading-tight">
                                {faq.question}
                              </p>
                            </div>
                            <div className="faq-icon flex-shrink-0">
                              <div 
                                ref={el => { iconRefs.current[index] = el; }}
                                data-wf--button-icon--variant="dark" 
                                className="button-icon bg-background/5 border border-black/10 rounded-full w-12 h-12 flex items-center justify-center text-white"
                              >
                                <div className="icon-embed-small is--small w-embed">
                                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.8229 10.9879V0.516113H13.2922V9.44325L9.4605 13.2749H0.453125V16.9661H10.8447L16.8229 10.9879Z" fill="currentColor"/>
                                    <path d="M13.1771 19.0121L13.1771 29.4839L16.7078 29.4839L16.7078 20.5568L20.5395 16.7251L29.5469 16.7251L29.5469 13.0339L19.1553 13.0339L13.1771 19.0121Z" fill="currentColor"/>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Accordion dropdown body */}
                          <div 
                            ref={el => { dropdownRefs.current[index] = el; }}
                            className="dropdown-bottom overflow-hidden h-0 opacity-0"
                          >
                            <div className="margin-top margin-medium pb-8 max-w-xl">
                              <p className="text-size-small text-gray-600 font-sans leading-relaxed md:hidden mb-4 font-semibold">
                                {faq.question}
                              </p>
                              <p className="text-size-tiny text-color-secondary font-sans leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkered flags marquee below section-faq */}
      <section data-gsap="marquee" className="section-check-marquee w-full overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes faqMarqueeCheckers {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-faq-checkers {
            display: flex;
            width: max-content;
            animation: faqMarqueeCheckers 25s linear infinite;
          }
        `}} />
        <div className="ticker-section w-full">
          <div className="ticker-component align-center w-full">
            <div className="ticker-main overflow-hidden flex flex-row">
              <div className="animate-faq-checkers">
                {Array.from({ length: 30 }).map((_, idx) => (
                  <div key={idx} className="square-ornament flex flex-row">
                    <div className="square" />
                    <div className="square is--black" />
                    <div className="square is--black" />
                    <div className="square" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
