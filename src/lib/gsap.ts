import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import CustomEase from 'gsap/dist/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export { gsap, ScrollTrigger, CustomEase };
