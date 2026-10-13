# Section Plan: Homepage Projects Section & Scroll Animations

This plan details the visual structure, layout classes, and next-level GSAP animations implemented for the **Projects Slider** section on the **Homepage**, aligning it 1:1 with the interactive experience of the reference site.

---

## 1. Homepage Projects Section Overview

On the homepage, the projects section acts as a sticky showcase. It locks the viewport when the section enters, and as the user continues to scroll down:
1. The viewport stays pinned.
2. The current project slide moves to the next project.
3. The background color of the screen morphs dynamically (e.g. Logitech black, Bamboo deep green, Rise lime-green).
4. The title text, project index numbers, media mockups, and tag category pills animate in-place.

```
+-----------------------------------------------------------------------------------+
|  [DUMEMEARTS]                                                           [ MENU ]  |
|                                                                                   |
|  (01) / 07                                                            [ VIEW -> ] |
|                                                                                   |
|  LOGITECH                              +---------------------------------------+  |
|  Designed a playbook containing...     |                                       |  |
|                                        |                                       |  |
|  [Design Systems] [2023]               |            BILLBOARD VIDEO            |  |
|                                        |                                       |  |
|                                        +---------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Dynamic Component Structure (`Projects.tsx`)

The component is split into left and right columns inside a viewport-sized container:

### Left Column: Text & Meta Content
- **Index List**: Stacks numbers `(01)` to `(07)` in a vertical flex strip. The list translates vertically by `translateY(-${activeIndex * 5}rem)` so the active index is shown.
- **Title List**: Stacks project titles in `font-humane` (condensed tall font). The entire strip translates vertically by `translateY(-${activeIndex * 13.1}em)` to transition between titles.
- **Description Paragraphs**: Smoothly fades and displays the description corresponding to the current active index.
- **Tag Pills**: Renders category tag pills with a dynamic text/border color contrast.

### Right Column: Double-Rounded Billboard Media
- **Video Stack Wrapper**: An aspect-ratio mockup frame (`aspect-[1.9/1]` or `aspect-[16/10]`) with thick borders.
- **Media List**: The media items stack vertically inside `.projects-video-list`. As the scroll active index changes, the list translates by `translateY(-${activeIndex * 100}%)`, revealing the active loop video.

---

## 3. GSAP ScrollTrigger Integration

The ScrollTrigger pins the section and drives the transition timeline based on scroll progress:

```javascript
import { gsap, ScrollTrigger } from "@/lib/gsap";

ScrollTrigger.create({
  trigger: containerRef.current, // Sticky scroll wrapper
  start: "top top",
  end: "+=600%",                  // Scroll depth for the 7 projects
  pin: ".projects-sticky",        // Pins the container
  scrub: true,
  onUpdate: (self) => {
    // Calculates the active index based on scroll progress
    const active = Math.min(
      Math.round(self.progress * (projects.length - 1)),
      projects.length - 1
    );
    setActiveIndex(active);
  }
});
```

---

## 4. Design Customization & Polish

- **Background Color Morphing**: The outer section changes background color on scroll. We map the styling inline:
  ```tsx
  style={{ backgroundColor: projects[activeIndex].color }}
  ```
- **Contrast Adaptation**: If the active project has a light background color (e.g. Rise's `#aaf24c` or Vogue's `#ebfa99`), all titles, descriptions, and outlines transition to black (`#1b1c1e`). If dark, they transition to white (`#ffffff`).
