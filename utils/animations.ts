import { animate } from "animejs";

export const fadeInUp = (target: string | Element, delay = 0) => {
  return animate(target,{
    translateY: [50, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 800,
    delay,
  });
};

export const staggerText = (target: string | Element) => {
  return animate(target,{
    translateY: [-100, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 30 * i
  });
};

export const scrollReveal = (target: string | Element) => {
  return animate(target,{
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutCubic',
    duration: 600,
  });
};

export const headerEntrance = (target: string | Element) => {
  return animate(target,{
    translateY: [-50, 0],
    opacity: [0, 1],
    easing: 'easeOutBack',
    duration: 1000,
    delay: 200,
  });
};