"use client";
import React from 'react';
import { MagneticButton } from '../MagneticButton';

export const Footer = () => {
  return (
    <footer id="contact" className="relative w-full min-h-screen bg-background text-white flex flex-col justify-between overflow-hidden">
      
      {/* Huge Rotated Text */}
      <div className="absolute top-0 right-0 h-full flex items-center justify-end pointer-events-none opacity-5">
        <h2 className="font-heading text-[15rem] md:text-[25rem] leading-[0.8] uppercase -rotate-90 origin-right translate-x-1/2">
          Ready to work?
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 lg:px-24 z-10">
        <div className="max-w-2xl">
          <h2 className="font-heading text-6xl md:text-8xl uppercase leading-[0.9] mb-8">
            LET'S <br/> COLLABORATE
          </h2>
          <p className="font-sans text-xl md:text-2xl text-gray-600 mb-12">
            I'm currently available for freelance work and open to new opportunities. Let's create something impactful together.
          </p>
          
          <MagneticButton className="inline-block">
            <a 
              href="mailto:info@hubsched.com" 
              className="group relative inline-flex items-center justify-center bg-primary-red text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[150%]">
                Email Me
              </span>
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
                Email Me
              </span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="w-full border-t border-black/10 px-6 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-4 z-10 text-sm font-bold uppercase tracking-widest text-gray-600">
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <div>
          © {new Date().getFullYear()} HUBSCHED. ALL RIGHTS RESERVED.
        </div>
      </div>

    </footer>
  );
};
