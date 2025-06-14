"use client";
import { useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
}
const Parallax = ({ children, speed = 0.3 }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--parallax", `${rect.top * speed}px`);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);
  return (
    <div
      ref={ref}
      className="relative ovenflow-hidden p-06 min-h-100 flex-col item-c z-0"
    >
      <div className="absolute inset-0 pointer-none z-min-1 custom-baground-image" />
      <Image
        src="/naliverse/thumbnail/book.webp"
        alt="Aljabar"
        height={500}
        width={1000}
        quality={100}
        className="object-position-c h-100-persen w-100 z-min-2 custom-parallax absolute pointer-none will-change-trans-height"
      />
      {children}
    </div>
  );
};
export default Parallax;
