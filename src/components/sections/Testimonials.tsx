"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const testimonials = [
  {
    name: "Davor Egyed",
    role: "Operations Director",
    company: "Derokki",
    quote: "HubSched AI Face Attendance has made our onsite attendance tracking an absolute breeze.",
    subQuote: "We integrated HubSched FaceID across our remote facilities. Our teams clock in securely in milliseconds, removing buddy punching and manual log entry. It has completely transformed our operations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120&q=80",
    photo: "https://hubsched.com/static/image/AI%20Face%20attendance.webp"
  },
  {
    name: "Olha Shcherbashyna",
    role: "HR Lead",
    company: "co+lab Branding",
    quote: "A rare blend of simplicity and advanced utility, HubSched payroll sync has elevated our HR workflows.",
    subQuote: "Our monthly payroll calculation processing time dropped from days to minutes. Having automated calculations for overtime, PF, and statutory payouts integrated with attendance is a game-changer.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120&q=80",
    photo: "https://hubsched.com/static/image/meeting%20room%20ios%20management.webp"
  },
  {
    name: "Ugo Udezue",
    role: "CEO & Co-Founder",
    company: "AFA Sports",
    quote: "HubSched's live GPS field tracking has redefined our sales operations and team productivity.",
    subQuote: "Managing field operations and client visits used to be a major logistical challenge. Now, our field sales reps submit client updates and location check-ins instantly, boosting transparency.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=120&h=120&q=80",
    photo: "https://hubsched.com/static/image/employee%20tracking%20new%20image.webp"
  },
  {
    name: "Elizabeth Jack-Rich",
    role: "Founder / CEO",
    company: "EJRAID",
    quote: "Automated visitor logs and IOT meeting desk setups have made our corporate offices secure.",
    subQuote: "Visitor logs are completely digital, host alerts are instant, and IOT room bookings have ended room double-bookings. Truly a comprehensive workspace management solution.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=120&h=120&q=80",
    photo: "https://hubsched.com/static/image/finalpagevister.webp"
  },
  {
    name: "Oliver Clapp",
    role: "Senior Director",
    company: "Itineris",
    quote: "The unified web dashboard gives us real-time data, role-based controls, and complete operational transparency.",
    subQuote: "Managing multiple offices and departments is simple with HubSched. The analytics dashboard compiles reports instantly, giving our leadership team complete oversight on resource allocation.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=120&h=120&q=80",
    photo: "https://hubsched.com/static/image/web%20Dashboard.webp"
  }
];

const TestimonialQuote = ({ text, active }: { text: string; active: boolean }) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!active || !textRef.current) return;
    const words = textRef.current.querySelectorAll('.word');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 85%",
        end: "bottom 55%",
        scrub: true,
      }
    });

    tl.to(words, {
      opacity: 1,
      color: "#ffffff",
      stagger: 0.05,
      ease: "none"
    });

    return () => {
      tl.kill();
    };
  }, [text, active]);

  return (
    <div className="slider-text-large leading-[1.1]">
      <p ref={textRef} className="m-0">
        {text.split(' ').map((word, idx) => (
          <span 
            key={idx} 
            className="word inline-block mr-[0.25em]"
            style={{ opacity: 0.2, color: 'rgba(255, 255, 255, 0.2)', transition: 'color 0.3s' }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = testimonialsRef.current;
    if (!el) return;

    // Stagger reveal tagline, photo stack, quote content, and arrows
    const tagline = el.querySelector('.top-tagline');
    const photoStack = el.querySelector('.left-wrapper');
    const swiperContent = el.querySelector('.swiper.is-content');
    const arrows = el.querySelector('.arrows');

    const targets = [tagline, photoStack, swiperContent, arrows].filter(Boolean);

    gsap.set(targets, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          overwrite: "auto"
        });
      },
      onLeaveBack: () => {
        gsap.to(targets, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.in",
          overwrite: "auto"
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  // Arrow button hover scale and shift animations
  const handleArrowMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget.querySelector('.arrow-btn');
    if (btn) {
      gsap.to(btn, { scale: 1.15, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleArrowMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget.querySelector('.arrow-btn');
    if (btn) {
      gsap.to(btn, { scale: 1.0, duration: 0.3, ease: 'power2.out' });
    }
  };

  // Card mouse-move hover interactive physics (Tilt and shift)
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      rotateY: x * 0.08,
      rotateX: -y * 0.08,
      x: x * 0.12,
      y: y * 0.12,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handlePhotoMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.75)"
    });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (isMobile) {
    return (
      <section className="section-testimonials-mobile w-full bg-background py-16">
        <div className="padding-global">
          <div className="container-large">
            <div className="testimonials-inner">
              
              {/* Tagline */}
              <div className="top-tagline">
                <div className="text-size-regular text-color-primary text-weight-medium">WHAT OTHERS</div>
                <div className="plus-icon w-embed">
                  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5083 11.7651V0.197266H12.8586V9.46042L9.01862 12.8732H0.5V18.369H11.9317L18.5083 11.7651Z" fill="currentColor"/>
                    <path d="M14.4917 20.6294L14.4917 32.1973L20.1414 32.1973L20.1414 22.9341L23.9814 19.5214L32.5 19.5214L32.5 14.0255L21.0683 14.0255L14.4917 20.6294Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-size-regular text-color-secondary text-weight-medium">SAY ABOUT HUBSCHED</div>
              </div>

              {/* Slider View */}
              <div className="testimonial-slider w-full mt-10">
                <div className="flex flex-col gap-8">
                  {testimonials.map((t, idx) => (
                    <div 
                      key={idx}
                      className="flex flex-col gap-6"
                      style={{ display: activeIndex === idx ? 'flex' : 'none' }}
                    >
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white p-4 relative flex items-center justify-center">
                        <img src={t.photo} alt={t.name} className="w-full h-full object-contain rounded-xl" />
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <p className="text-2xl text-white font-heading uppercase leading-tight">
                          {t.quote}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          "{t.subQuote}"
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                          <div className="flex flex-col">
                            <span className="text-white text-sm font-semibold uppercase">{t.name}</span>
                            <span className="text-gray-600 text-xs uppercase">{t.role} • {t.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Dot Indicators / Navigation */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex gap-2">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveIndex(idx)}
                          className="w-2.5 h-2.5 rounded-full transition-colors"
                          style={{ backgroundColor: activeIndex === idx ? '#ffffff' : 'rgba(255,255,255,0.2)' }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button onClick={(e) => { e.preventDefault(); setActiveIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1); }} className="text-white text-sm uppercase">PREV</button>
                      <button onClick={(e) => { e.preventDefault(); setActiveIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1); }} className="text-white text-sm uppercase">NEXT</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Slider Split layout
  return (
    <div ref={testimonialsRef} className="section-testimonials-wrap w-full relative">
      <section className="section-testimonials w-full relative">
        <div className="padding-global align-center">
          <div className="container-large align-center">
            <div data-reveal-group="" className="testimonials-inner">
              
              {/* Top Tagline */}
              <div className="top-tagline">
                <div className="text-size-regular text-color-primary text-weight-medium">WHAT OTHERS</div>
                <div className="plus-icon w-embed">
                  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5083 11.7651V0.197266H12.8586V9.46042L9.01862 12.8732H0.5V18.369H11.9317L18.5083 11.7651Z" fill="currentColor"/>
                    <path d="M14.4917 20.6294L14.4917 32.1973L20.1414 32.1973L20.1414 22.9341L23.9814 19.5214L32.5 19.5214L32.5 14.0255L21.0683 14.0255L14.4917 20.6294Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-size-regular text-color-white text-weight-medium">SAY ABOUT HUBSCHED</div>
              </div>

              {/* Main Testimonials Slider Frame */}
              <div className="testimonial-slider">
                <div className="slider_wrap">
                  
                  {/* Left Stacked photos */}
                  <div className="slider_left">
                    <div className="expertise-left">
                      <div 
                        className="left-wrapper is--testimonial"
                        onMouseMove={handlePhotoMouseMove}
                        onMouseLeave={handlePhotoMouseLeave}
                      >
                        
                        <div className="swiper is-photos w-dyn-list">
                          <div className="swiper-wrapper is-photos w-dyn-items">
                            {testimonials.map((t, idx) => {
                              const diff = (idx - activeIndex + testimonials.length) % testimonials.length;
                              let zIndex = 1;
                              let scale = 0.85;
                              let rotate = 0;
                              let tx = 0;
                              let ty = 0;
                              let opacity = 0;

                              if (diff === 0) {
                                zIndex = 5;
                                scale = 1;
                                rotate = 0;
                                opacity = 1;
                              } else if (diff === 1) {
                                zIndex = 4;
                                scale = 0.95;
                                rotate = 4;
                                tx = 10;
                                ty = 4;
                                opacity = 0.8;
                              } else if (diff === 2) {
                                zIndex = 3;
                                scale = 0.9;
                                rotate = -4;
                                tx = -10;
                                ty = 6;
                                opacity = 0.6;
                              }

                              return (
                                <div 
                                  key={idx}
                                  className="swiper-slide is-photos w-dyn-item flex items-center justify-center p-6"
                                  style={{
                                    zIndex,
                                    transform: `scale(${scale}) rotate(${rotate}deg) translate(${tx}px, ${ty}px)`,
                                    opacity,
                                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease',
                                    position: 'absolute',
                                    inset: '0%',
                                    borderRadius: '32px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                    backgroundColor: '#ffffff'
                                  }}
                                >
                                  <img 
                                    src={t.photo} 
                                    alt={t.name} 
                                    className="w-full h-full object-contain rounded-2xl" 
                                    style={{ backgroundColor: '#ffffff' }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Dashed Outline Frame Corners */}
                        <div className="card-corners-wrapper">
                          <div className="corners">
                            <div className="frame-corner" />
                            <div className="frame-corner is--2" />
                            <div className="frame-corner is--3" />
                            <div className="frame-corner is--4" />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Right Content Quote & Info */}
                  <div className="slider_right">
                    <div className="swiper is-content w-dyn-list">
                      <div className="swiper-wrapper is-content w-dyn-items">
                        {testimonials.map((t, idx) => (
                          <div 
                            key={idx} 
                            className="swiper-slide is-content w-dyn-item"
                            style={{
                              opacity: activeIndex === idx ? 1 : 0,
                              visibility: activeIndex === idx ? 'visible' : 'hidden',
                              transform: activeIndex === idx ? 'translateX(0px)' : 'translateX(30px)',
                              transition: 'opacity 0.6s ease, transform 0.6s ease, visibility 0.6s',
                              position: activeIndex === idx ? 'relative' : 'absolute',
                              inset: activeIndex === idx ? 'auto' : '0% 0% 0% 0%'
                            }}
                          >
                            
                            {/* Animated Large Highlight Quote */}
                            <div className="slider-title">
                              <TestimonialQuote text={t.quote} active={activeIndex === idx} />
                            </div>

                            {/* Sub Quote description text */}
                            <div className="slider-info-middle">
                              <p className="text-size-regular text-color-secondary">
                                "{t.subQuote}"
                              </p>
                            </div>

                            {/* Author info & avatar */}
                            <div className="testimonial-author-wrapper">
                              <div 
                                className="testimonial-author-image"
                                style={{ backgroundImage: `url(${t.avatar})` }}
                              />
                              <div className="blog-author-text">
                                <div className="text-size-small text-color-primary text-weight-semibold text-style-allcaps">
                                  {t.name}
                                </div>
                                <div className="blog-date-wrapper">
                                  <div className="text-size-tiny text-style-allcaps">
                                    {t.role}
                                  </div>
                                  <div className="circle-dot is--smaller" />
                                  <div className="text-size-tiny text-color-secondary text-style-allcaps">
                                    {t.company}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Big Quote symbol indicator */}
                            <div className="quote-vector w-embed">
                              <svg width="69" height="65" viewBox="0 0 69 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.6364 37.8443V0.197266H69V37.8443L62.1 64.1973H46.1045L52.6909 37.8443H37.6364ZM0 37.8443V0.197266H31.3636V37.8443L24.4636 64.1973H8.46818L15.0545 37.8443H0Z" fill="currentColor"/>
                              </svg>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation control arrows */}
                    <div className="arrows">
                      <a 
                        href="#" 
                        onClick={handlePrev} 
                        onMouseEnter={handleArrowMouseEnter}
                        onMouseLeave={handleArrowMouseLeave}
                        className="arrow is-left w-inline-block"
                      >
                        <div data-wf--button-arrow--direction="previous" className="arrow-btn">
                          <div className="arrow-icon w-variant-7134e1bf-4f83-3817-89f3-2de83b852b90 w-embed">
                            <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <a 
                        href="#" 
                        onClick={handleNext} 
                        onMouseEnter={handleArrowMouseEnter}
                        onMouseLeave={handleArrowMouseLeave}
                        className="arrow is-right w-inline-block"
                      >
                        <div data-wf--button-arrow--direction="next" className="arrow-btn">
                          <div className="arrow-icon w-embed">
                            <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
