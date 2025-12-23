import { useEffect, useRef, useState, RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): [RefObject<T>, boolean] => {
  const { threshold = 0.1, triggerOnce = true, rootMargin = "0px" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, isVisible];
};

// Animation wrapper component
interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale" | "slide-up";
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimateOnScroll = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
}: AnimateOnScrollProps) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return { ...baseStyles, opacity: 0, transform: "translateY(40px)" };
        case "fade-in":
          return { ...baseStyles, opacity: 0 };
        case "fade-left":
          return { ...baseStyles, opacity: 0, transform: "translateX(-40px)" };
        case "fade-right":
          return { ...baseStyles, opacity: 0, transform: "translateX(40px)" };
        case "scale":
          return { ...baseStyles, opacity: 0, transform: "scale(0.9)" };
        case "slide-up":
          return { ...baseStyles, opacity: 0, transform: "translateY(60px)" };
        default:
          return { ...baseStyles, opacity: 0 };
      }
    }

    return { ...baseStyles, opacity: 1, transform: "translateY(0) translateX(0) scale(1)" };
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
};

export default useScrollAnimation;
