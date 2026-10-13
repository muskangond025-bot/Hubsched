"use client";
import React, { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
};
