"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

// Project Data inspired by Kenichi Aikawa's portfolio & Make My Vid
const GALLERY_ITEMS = [
  {
    id: "01",
    title: "NEON SHINJUKU",
    category: "CINEMATOGRAPHY",
    client: "SONY ENTERTAINMENT",
    year: "2026",
    aspect: 1.5,
    colors: {
      a: [0.1, 0.05, 0.25],
      b: [0.95, 0.2, 0.45],
      c: [0.05, 0.4, 0.85],
      d: [0.02, 0.02, 0.05],
    },
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85",
    desc: "35mm anamorphic night documentation captured across Shinjuku & Shibuya backstreets.",
  },
  {
    id: "02",
    title: "MONOCHROME ESSENCE",
    category: "HIGH FASHION",
    client: "VOGUE EDITORIAL",
    year: "2026",
    aspect: 0.75,
    colors: {
      a: [0.9, 0.9, 0.9],
      b: [0.2, 0.2, 0.25],
      c: [0.05, 0.05, 0.05],
      d: [0.85, 0.85, 0.9],
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
    desc: "Sculptural portraiture experimenting with high-contrast chiaroscuro lighting and physical film grain.",
  },
  {
    id: "03",
    title: "HORIZON APERTURE",
    category: "DIRECTION",
    client: "BALENCIAGA CAMPAIGN",
    year: "2025",
    aspect: 1.4,
    colors: {
      a: [0.85, 0.45, 0.15],
      b: [0.2, 0.1, 0.3],
      c: [0.95, 0.75, 0.4],
      d: [0.05, 0.02, 0.1],
    },
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
    desc: "Cinematic commercial film shot at golden twilight on location in Iceland and Hokkaido.",
  },
  {
    id: "04",
    title: "KINETIC DRIFT",
    category: "COMMERCIAL",
    client: "PORSCHE MOTORSPORT",
    year: "2025",
    aspect: 1.6,
    colors: {
      a: [0.9, 0.1, 0.1],
      b: [0.1, 0.2, 0.4],
      c: [0.02, 0.02, 0.04],
      d: [0.7, 0.05, 0.15],
    },
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=85",
    desc: "High-velocity tracking shots synchronized with robotic camera rigs and custom anamorphic optics.",
  },
  {
    id: "05",
    title: "BRUTALIST MONOLITH",
    category: "CINEMATOGRAPHY",
    client: "ARCHITECTURAL DIGEST",
    year: "2025",
    aspect: 0.8,
    colors: {
      a: [0.3, 0.35, 0.4],
      b: [0.75, 0.8, 0.85],
      c: [0.1, 0.12, 0.15],
      d: [0.5, 0.55, 0.6],
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    desc: "Exploration of architectural rhythm, concrete mass, and stark daylight shadows.",
  },
  {
    id: "06",
    title: "PRISMATIC DISPERSION",
    category: "HIGH FASHION",
    client: "ISSEY MIYAKE",
    year: "2026",
    aspect: 1.25,
    colors: {
      a: [0.4, 0.85, 0.95],
      b: [0.95, 0.4, 0.8],
      c: [0.9, 0.85, 0.2],
      d: [0.1, 0.05, 0.25],
    },
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=85",
    desc: "Optical prism dispersion through multi-coated glass elements, creating real chromatic diffraction.",
  },
];

// GLSL Vertex Shader - Sourced directly from aikawakenichi.com
const VERTEX_SHADER = /* glsl */ `
  precision highp float;
  #define PI 3.141592653589793

  varying vec2 vUv;
  varying float vTopFade;

  uniform vec2 iResolution;
  uniform vec2 uSize;
  uniform float uScrollPos;
  uniform float uVelocity;

  // Film Roll / Top Viewport Curl uniforms
  uniform float uRollTopBend;
  uniform float uRollTopRadius;
  uniform float uRollTopRange;
  uniform float uRollTopReturn;
  uniform float uRollTopStart;
  uniform float uRollTopFade;
  uniform float uRollTopFadeStart;

  // Harmonic Wave & Flutter uniforms
  uniform float uEffectsStrength;
  uniform float uEffectsWaveSmooth;
  uniform float uEffectsWaveSpacing;
  uniform float uEffectsHorizontalProgress;
  uniform float uEffectsHorizontalStrength;
  uniform float uEffectsHorizontalWaveSpacing;

  void main() {
    vUv = uv;
    vec3 nPos = position.xyz;

    // 1. Film Roll / Top Viewport Curl
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    float topThreshold = (iResolution.y * 0.5) - (iResolution.y * uRollTopStart);
    float topRange = max(iResolution.y * uRollTopRange, 1.0);
    float band = clamp((worldPosition.y - topThreshold) / topRange, 0.0, 1.0);

    vTopFade = 0.0;
    if (band > 0.0) {
      float rollMask = smoothstep(0.0, 1.0, band);
      float rollEnter = smoothstep(0.0, 0.42, band);
      float rollReturn = smoothstep(0.44, 0.92, band);
      float curlEnter = sin(rollEnter * PI * 0.5);
      float curlReturn = sin(rollReturn * PI);
      float sCurve = (curlEnter * 0.92) - (curlReturn * uRollTopReturn * 0.48);

      nPos.y += smoothstep(0.62, 0.98, band) * uRollTopBend * 0.18;
      nPos.z -= sCurve * uRollTopRadius * rollMask;
      vTopFade = pow(smoothstep(uRollTopFadeStart, 1.0, band), 0.7) * uRollTopFade;
    }

    vec4 mvPosition = modelViewMatrix * vec4(nPos, 1.0);
    float horizontalProgress = clamp(uEffectsHorizontalProgress, 0.0, 1.0);

    // 2. Vertical Flutter: Multi-harmonic waves driven by velocity
    if (abs(uVelocity) > 0.00001 && abs(uEffectsStrength) > 0.00001) {
      float flutterPhase = (
        (mvPosition.y / max(iResolution.y, 1.0)) * PI * 2.0 / max(uEffectsWaveSpacing, 0.001)
        - uScrollPos / max(iResolution.y, 1.0)
      );
      float baseWave = sin(flutterPhase);
      float detailWave = sin(flutterPhase * 0.48 - 1.1);
      float tertiaryWave = sin(flutterPhase * 0.26 + 1.6);
      float smoothFlutter = (baseWave * 0.72) + (detailWave * 0.20) + (tertiaryWave * 0.08);

      mvPosition.z += smoothFlutter * uVelocity * uEffectsStrength * 16.0 * (1.0 - horizontalProgress);
    }

    // 3. Horizontal Flutter: Wave motion when in horizontal strip mode
    if (horizontalProgress > 0.001 && abs(uVelocity) > 0.00001) {
      float hPhase = (
        (mvPosition.x / max(iResolution.x, 1.0)) * PI * 2.0 / max(uEffectsHorizontalWaveSpacing, 0.001)
        - uScrollPos / max(iResolution.x, 1.0)
      );
      float hWave = sin(hPhase);
      float hDetail = sin(hPhase * 0.42 - 0.8);
      float smoothHWave = (hWave * 0.7) + (hDetail * 0.3);

      mvPosition.z += smoothHWave * uVelocity * uEffectsHorizontalStrength * 16.0 * horizontalProgress;
    }

    gl_Position = projectionMatrix * mvPosition;
  }
`;

// GLSL Fragment Shader - Sourced directly from aikawakenichi.com
const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vTopFade;

  uniform sampler2D tDiffuse;
  uniform vec2 uUvScale;
  uniform float uAlpha;
  uniform float uVelocity;
  uniform float uEffectsBlurVelocity;
  uniform float uEffectsAberration;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorD;
  uniform float uImageMix;

  void main() {
    if (uAlpha <= 0.0001) discard;

    vec2 uvCover = vUv * uUvScale + (1.0 - uUvScale) * 0.5;

    // Bilinear 4-Point Color Gradient
    vec3 grad = mix(
      mix(uColorA, uColorB, uvCover.x),
      mix(uColorC, uColorD, uvCover.y),
      length(uvCover - 0.5)
    );

    float velocityBlur = clamp(abs(uVelocity) * uEffectsBlurVelocity, 0.0, 0.07);
    vec2 blurDir = vec2(velocityBlur * 0.4, velocityBlur * sign(uVelocity == 0.0 ? 1.0 : uVelocity));

    // Multi-tap directional velocity motion blur
    vec3 center = texture2D(tDiffuse, uvCover).rgb;
    vec3 nearA = texture2D(tDiffuse, uvCover - blurDir * 0.5).rgb;
    vec3 nearB = texture2D(tDiffuse, uvCover + blurDir * 0.5).rgb;
    vec3 farA  = texture2D(tDiffuse, uvCover - blurDir).rgb;
    vec3 farB  = texture2D(tDiffuse, uvCover + blurDir).rgb;

    vec3 blurred = (center * 0.32 + nearA * 0.24 + nearB * 0.24 + farA * 0.10 + farB * 0.10);

    // Chromatic Aberration (RGB Split)
    vec2 aberrationOffset = vec2(uEffectsAberration * (vTopFade * 0.8 + velocityBlur * 1.5), 0.0);
    vec3 finalImage = vec3(
      texture2D(tDiffuse, uvCover + aberrationOffset).r,
      blurred.g,
      texture2D(tDiffuse, uvCover - aberrationOffset).b
    );

    vec3 composite = mix(grad, finalImage, clamp(uImageMix, 0.0, 1.0));
    float finalAlpha = uAlpha * (1.0 - vTopFade);

    gl_FragColor = vec4(composite, finalAlpha);
  }
`;

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Layout & UI States
  const [layoutMode, setLayoutMode] = useState<"vertical" | "horizontal">("horizontal");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  // References to WebGL resources for interaction
  const sceneStateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    meshes: THREE.Mesh[];
    textures: THREE.Texture[];
    scrollPos: number;
    targetScrollPos: number;
    velocity: number;
    isDragging: boolean;
    dragStartX: number;
    dragStartY: number;
    dragStartScroll: number;
    layoutProgress: number;
    rafId: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    meshes: [],
    textures: [],
    scrollPos: 0,
    targetScrollPos: 0,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartScroll: 0,
    layoutProgress: 1.0, // starts in horizontal mode
    rafId: 0,
  });

  // Filter items
  const filteredItems = activeFilter === "ALL"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  // Switch Layout Mode with GSAP
  const handleToggleLayout = useCallback(() => {
    const nextMode = layoutMode === "horizontal" ? "vertical" : "horizontal";
    setLayoutMode(nextMode);

    const targetProgress = nextMode === "horizontal" ? 1.0 : 0.0;
    gsap.to(sceneStateRef.current, {
      layoutProgress: targetProgress,
      duration: 0.9,
      ease: "power2.inOut",
      onUpdate: () => {
        sceneStateRef.current.meshes.forEach((mesh) => {
          const mat = mesh.material as THREE.ShaderMaterial;
          if (mat.uniforms.uEffectsHorizontalProgress) {
            mat.uniforms.uEffectsHorizontalProgress.value = sceneStateRef.current.layoutProgress;
          }
        });
      },
    });
  }, [layoutMode]);

  // Three.js Initialization & Render Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const fov = 45;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 2000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const state = sceneStateRef.current;
    state.renderer = renderer;
    state.scene = scene;
    state.camera = camera;
    state.layoutProgress = layoutMode === "horizontal" ? 1.0 : 0.0;

    // 2. Texture Loader & Geometry
    const textureLoader = new THREE.TextureLoader();
    const planeGeo = new THREE.PlaneGeometry(1, 1, 32, 32);

    // 3. Create Meshes for each Gallery Item
    state.meshes = [];
    state.textures = [];

    GALLERY_ITEMS.forEach((item) => {
      const tex = textureLoader.load(item.image);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      state.textures.push(tex);

      const mat = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          tDiffuse: { value: tex },
          uUvScale: { value: new THREE.Vector2(1.0, 1.0) },
          iResolution: { value: new THREE.Vector2(width, height) },
          uSize: { value: new THREE.Vector2(320, 320 / item.aspect) },
          uScrollPos: { value: 0 },
          uVelocity: { value: 0 },
          uAlpha: { value: 1.0 },

          // Film Roll / Curl settings from Kenichi Aikawa
          uRollTopBend: { value: 120.0 },
          uRollTopRadius: { value: 180.0 },
          uRollTopRange: { value: 0.5 },
          uRollTopReturn: { value: 0.65 },
          uRollTopStart: { value: 0.1 },
          uRollTopFade: { value: 0.85 },
          uRollTopFadeStart: { value: 0.2 },

          // Flutter & Waves
          uEffectsStrength: { value: 2.2 },
          uEffectsWaveSmooth: { value: 0.8 },
          uEffectsWaveSpacing: { value: 0.5 },
          uEffectsHorizontalProgress: { value: state.layoutProgress },
          uEffectsHorizontalStrength: { value: 2.0 },
          uEffectsHorizontalWaveSpacing: { value: 0.45 },

          // Motion Blur & Aberration
          uEffectsBlurVelocity: { value: 0.003 },
          uEffectsAberration: { value: 0.025 },

          // Bilinear Colors
          uColorA: { value: new THREE.Vector3(...item.colors.a) },
          uColorB: { value: new THREE.Vector3(...item.colors.b) },
          uColorC: { value: new THREE.Vector3(...item.colors.c) },
          uColorD: { value: new THREE.Vector3(...item.colors.d) },
          uImageMix: { value: 1.0 },
        },
      });

      const mesh = new THREE.Mesh(planeGeo, mat);
      scene.add(mesh);
      state.meshes.push(mesh);
    });

    // 4. Position Meshes in 3D Space based on Layout Mode
    const updateMeshTransforms = (scroll: number, progress: number) => {
      const cardWidth = Math.min(width * 0.36, 420);
      const gapX = cardWidth + 48;
      const gapY = 480;

      state.meshes.forEach((mesh, idx) => {
        const item = GALLERY_ITEMS[idx];
        const cardHeight = cardWidth / item.aspect;
        mesh.scale.set(cardWidth, cardHeight, 1);

        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uSize.value.set(cardWidth, cardHeight);

        // Horizontal positioning
        const hX = (idx * gapX) - scroll;
        const hY = Math.sin(idx * 0.8 + scroll * 0.002) * 20;

        // Vertical positioning (2 columns alternating)
        const col = idx % 2 === 0 ? -1 : 1;
        const row = Math.floor(idx / 2);
        const vX = col * (cardWidth * 0.6 + 24);
        const vY = -(row * gapY) + scroll;

        // Interpolate between Vertical and Horizontal
        mesh.position.x = THREE.MathUtils.lerp(vX, hX, progress);
        mesh.position.y = THREE.MathUtils.lerp(vY, hY, progress);
        mesh.position.z = Math.sin(idx * 1.5 + scroll * 0.003) * 15;

        // Subtle rotation matching film strip movement
        mesh.rotation.y = THREE.MathUtils.lerp(0, -state.velocity * 0.001, progress);
        mesh.rotation.z = THREE.MathUtils.lerp(col * 0.02, state.velocity * 0.0005, progress);
      });
    };

    // 5. Render Loop with Smooth Inertia Dampening
    let lastScroll = 0;
    const animate = () => {
      // Inertia interpolation (Lerp 0.08)
      state.scrollPos += (state.targetScrollPos - state.scrollPos) * 0.08;
      state.velocity = state.scrollPos - lastScroll;
      lastScroll = state.scrollPos;

      // Update uniforms for all meshes
      state.meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uScrollPos.value = state.scrollPos;
        mat.uniforms.uVelocity.value = state.velocity;
      });

      updateMeshTransforms(state.scrollPos, state.layoutProgress);
      renderer.render(scene, camera);

      // Track active center index
      const cardWidth = Math.min(width * 0.36, 420) + 48;
      const currentIndex = Math.max(
        0,
        Math.min(
          GALLERY_ITEMS.length - 1,
          Math.round(state.scrollPos / cardWidth)
        )
      );
      setActiveIndex(currentIndex);

      state.rafId = requestAnimationFrame(animate);
    };
    state.rafId = requestAnimationFrame(animate);

    // 6. Native Wheel & Touch Event Handlers
    const onWheel = (e: WheelEvent) => {
      // When hovering over this section, handle gallery scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        state.targetScrollPos += e.deltaX * 1.2;
      } else {
        // In horizontal mode, vertical scroll drives horizontal gallery
        if (state.layoutProgress > 0.5) {
          state.targetScrollPos += e.deltaY * 1.0;
        } else {
          state.targetScrollPos += e.deltaY * 0.9;
        }
      }

      // Bound scrolling range
      const maxScroll = (GALLERY_ITEMS.length - 1) * 440;
      state.targetScrollPos = Math.max(-100, Math.min(maxScroll + 200, state.targetScrollPos));
    };

    const onPointerDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.dragStartX = e.clientX;
      state.dragStartY = e.clientY;
      state.dragStartScroll = state.targetScrollPos;
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!state.isDragging) return;
      const delta = state.layoutProgress > 0.5
        ? (state.dragStartX - e.clientX) * 1.5
        : (e.clientY - state.dragStartY) * 1.5;
      state.targetScrollPos = state.dragStartScroll + delta;

      const maxScroll = (GALLERY_ITEMS.length - 1) * 440;
      state.targetScrollPos = Math.max(-100, Math.min(maxScroll + 200, state.targetScrollPos));
    };

    const onPointerUp = () => {
      state.isDragging = false;
      canvas.style.cursor = "grab";
    };

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);

      state.meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.iResolution.value.set(newW, newH);
      });
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(state.rafId);
      container.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);

      // Dispose WebGL resources
      state.meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      state.textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [layoutMode]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-intro is--hero w-full min-h-[100vh] h-[100vh] bg-[#000000] text-white flex flex-col justify-between relative overflow-hidden select-none border-t border-b border-white/10"
    >
      {/* 1. Hidden SVG Realistic Physical Glass Distortion Filter */}
      <svg className="hidden">
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feTurbulence
            id="glass-turbulence"
            type="fractalNoise"
            baseFrequency="0.0015 0.006"
            numOctaves={1}
            seed={24}
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
            <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
            <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation={8} result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale={5}
            specularConstant={1}
            specularExponent={100}
            lightingColor="white"
            result="specLight"
          />
        </filter>
      </svg>

      {/* 2. Minimalist Fashion-Editorial Header (Aikawa Aesthetic) */}
      <div className="w-full px-6 md:px-12 pt-8 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto group cursor-pointer">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase font-semibold text-white/90">
                MAKE MY VID · CINEMATOGRAPHY
              </h2>
            </div>
            <p className="text-[10px] md:text-xs font-mono text-white/40 tracking-wider mt-0.5">
              19.0760° N, 72.8777° E · MUMBAI / TOKYO · [2026]
            </p>
          </div>
        </div>

        {/* Live Status & Filter indicators */}
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
          <div className="flex items-center gap-3 text-xs font-mono text-white/60">
            <span className="text-white/30">[STREAM]</span>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}</span>
          </div>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="text-xs font-mono text-white/80 tracking-widest uppercase">
            {GALLERY_ITEMS[activeIndex]?.title || "CINEMA"}
          </div>
        </div>
      </div>

      {/* 3. Three.js Full-Viewport WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
      />

      {/* 4. Editorial Background Micro-Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[18vw] font-black text-white/[0.02] tracking-tighter uppercase select-none font-sans">
          CINEMA
        </span>
      </div>

      {/* 5. Liquid Glass Floating Nav Dock (The Signature Kenichi Aikawa Element) */}
      <div className="w-full pb-8 flex items-center justify-center z-30 pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full transition-all duration-500"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(12px) url(#glass-distortion) saturate(190%)",
            WebkitBackdropFilter: "blur(12px) saturate(190%)",
            boxShadow: `
              inset 0 0 0 1px rgba(255, 255, 255, 0.18),
              inset 1.8px 3px 0 -2px rgba(255, 255, 255, 0.75),
              inset -2px -2px 0 -2px rgba(255, 255, 255, 0.5),
              inset -3px -8px 1px -6px rgba(255, 255, 255, 0.35),
              inset 0 3px 4px -2px rgba(0, 0, 0, 0.4),
              0 1px 5px rgba(0, 0, 0, 0.2),
              0 10px 28px rgba(0, 0, 0, 0.45)
            `,
          }}
        >
          {/* Mode Switcher Button: Horizontal vs Vertical */}
          <button
            onClick={handleToggleLayout}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300"
            title="Toggle between Horizontal Film Strip & Vertical Grid"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-500 ${layoutMode === "vertical" ? "rotate-90" : "rotate-0"}`}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="3" width="12" height="4" rx="1" />
              <rect x="2" y="9" width="12" height="4" rx="1" />
            </svg>
            <span className="uppercase">{layoutMode === "horizontal" ? "Horizontal" : "Vertical"}</span>
          </button>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Quick Category Filters */}
          <div className="flex items-center gap-1">
            {["ALL", "CINEMATOGRAPHY", "HIGH FASHION", "COMMERCIAL"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Inspect / View Full Details Button */}
          <button
            onClick={() => setSelectedItem(GALLERY_ITEMS[activeIndex])}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium bg-white/15 hover:bg-white/25 text-white transition-all duration-300 hover:scale-[1.02]"
          >
            <span>INFO</span>
            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 12L10 8L6 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 6. Full-Screen Radial Lens Modal (applyMainDetailsCamera Effect) */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-16 animate-fadeIn"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-950/80 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8 p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              ✕
            </button>

            {/* Modal Image with subtle corner chromatic edge */}
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden relative shadow-lg border border-white/10">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Modal Details Content */}
            <div className="w-full md:w-1/2 flex flex-col text-left">
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                {selectedItem.category} · {selectedItem.year}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading uppercase text-white font-bold mb-4 tracking-wide">
                {selectedItem.title}
              </h3>
              <p className="text-sm font-sans text-white/70 leading-relaxed mb-6">
                {selectedItem.desc}
              </p>

              <div className="flex flex-col gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-white/50">
                  <span>CLIENT:</span>
                  <span className="text-white font-medium">{selectedItem.client}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>FORMAT:</span>
                  <span className="text-white font-medium">35MM ANAMORPHIC / 4K PRORES</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>PRODUCTION:</span>
                  <span className="text-white font-medium">MAKE MY VID</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
