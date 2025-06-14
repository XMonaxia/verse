"use client";
import React from "react";
import { useScroll } from "@/components/Provider/ScrollContent";

const Top = () => {
  const { isScrolledPast } = useScroll();
  const BackTop = isScrolledPast(80);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      className={`fixed bottom-10px b-black p-tb-05-lr-1 sendBtn merienda fs-08 z-1000 transformY-100 border-custom radius-10-custom opacity-0 pointer-none trans-fransform-opacity-03 ${
        BackTop ? "transformY-0 pointer-auto opacity-1" : ""
      }`}
      onClick={scrollToTop}
    >
      <span>Back Top</span>
    </button>
  );
};

export default Top;
