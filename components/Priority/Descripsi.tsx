"use client";
import { PuisiTypes } from "@/model/Puisi";
import React, { useEffect, useState } from "react";

interface DescripsiProps {
  puisi: PuisiTypes[];
}

const Descripsi = ({ puisi }: DescripsiProps) => {
  const [objectIndex, setObjectIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const poem = puisi[objectIndex];
    if (!poem) return;
    const line = poem.content[lineIndex];
    if (!line) return;
    const isTyping = charIndex < line.length;
    const delay = isTyping ? 50 : 3000;
    const timeout = setTimeout(() => {
      if (isTyping) {
        setDisplayedText((prev) => prev + line[charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        const nextLine = lineIndex + 1;
        const isLastLine = nextLine >= poem.content.length;
        const nextPoem = isLastLine
          ? (objectIndex + 1) % puisi.length
          : objectIndex;
        setObjectIndex(nextPoem);
        setLineIndex(isLastLine ? 0 : nextLine);
        setDisplayedText("");
        setCharIndex(0);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [paused, puisi, objectIndex, lineIndex, charIndex]);

  const currentPoem = puisi[objectIndex];
  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);
  return (
    <div
      className="flex-col w-90 max-w-700 p-lr-07 border-custom radius-10-custom b-black-opacity-low backdrop-7"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <h1 className="text-c m-tb-05 fs-1-02">
        {currentPoem.title} -{" "}
        <span className="c-hover-whites">
          {lineIndex + 1} / {currentPoem.content.length}
        </span>
      </h1>
      <p className="border-t-custom merienda fs-09 lh-1-07 wc-pre-l c-hover-white trans-color-03 relative p-06 md-fs-08">
        {displayedText}
        <span className="inline-block w-1px m-l-03 aimate-blink-1">|</span>
      </p>
    </div>
  );
};
export default Descripsi;
