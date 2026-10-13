"use client"

import { Globe } from "@/components/ui/cobe-globe"

const markers = [
  { id: "sf", location: [37.7595, -122.4367] as [number, number], label: "San Francisco" },
  { id: "nyc", location: [40.7128, -74.006] as [number, number], label: "New York" },
  { id: "tokyo", location: [35.6762, 139.6503] as [number, number], label: "Tokyo" },
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London" },
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number], label: "Sydney" },
  { id: "capetown", location: [-33.9249, 18.4241] as [number, number], label: "Cape Town" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "paris", location: [48.8566, 2.3522] as [number, number], label: "Paris" },
  { id: "saopaulo", location: [-23.5505, -46.6333] as [number, number], label: "São Paulo" },
]

const arcs = [
  {
    id: "sf-tokyo",
    from: [37.7595, -122.4367] as [number, number],
    to: [35.6762, 139.6503] as [number, number],
    label: "SF → Tokyo",
  },
  {
    id: "nyc-london",
    from: [40.7128, -74.006] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    label: "NYC → London",
  },
]

export default function GlobeDemo() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black p-8 overflow-hidden">
      <div className="w-full max-w-lg flex flex-col items-center text-center">
        <h1 className="font-heading text-2xl text-white uppercase tracking-widest mb-6">
          Global Presence
        </h1>
        <Globe
          markers={markers}
          arcs={arcs}
          markerColor={[0.1, 0.45, 0.9]}
          baseColor={[0.15, 0.15, 0.15]}
          arcColor={[0.1, 0.45, 0.9]}
          glowColor={[0.15, 0.2, 0.35]}
          dark={1}
          mapBrightness={6}
          markerSize={0.03}
          markerElevation={0.02}
          className="w-full"
        />
        <a 
          href="/"
          className="mt-8 border border-white/20 hover:border-white text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 bg-white/5 hover:bg-white hover:text-black"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
