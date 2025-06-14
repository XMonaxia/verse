"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const ScrollContext = createContext<{ scrollY: number }>({ scrollY: 0 });
export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};
export const useScroll = () => {
  const { scrollY } = useContext(ScrollContext);
  const isScrolledPast = (vh: number) => {
    if (typeof window === "undefined") return false;
    const thresholdPx = (vh / 100) * window.innerHeight;
    return scrollY > thresholdPx;
  };
  return { scrollY, isScrolledPast };
};
