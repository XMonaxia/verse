"use client";
import { useEffect, useRef } from "react";
interface TabHeaderProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const TabHeader = ({ tabs, activeIndex, onChange }: TabHeaderProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    const underline = underlineRef.current;
    if (currentTab && underline) {
      const tabRect = currentTab.getBoundingClientRect();
      const parentRect = currentTab.parentElement!.getBoundingClientRect();
      underline.style.width = `${tabRect.width}px`;
      underline.style.transform = `translateX(${
        tabRect.left - parentRect.left
      }px)`;
    }
  }, [activeIndex]);
  return (
    <div className="relative flex border-b-custom m-b-05 ">
      {tabs.map((tab, modaltab) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[modaltab] = el;
          }}
          className={`flex-1 p-1 fw-700 c-hover-white text-c relative trans-color-03 z-1 md-fs-09 ${
            activeIndex === modaltab ? "c-white" : ""
          }`}
          onClick={() => onChange(modaltab)}
        >
          {tab}
        </button>
      ))}
      <span
        ref={underlineRef}
        className="absolute bottom-0 h-2px b-hover-white z-15 will-change-trans-width trans-fransform-width-03"
      />
    </div>
  );
};
export default TabHeader;
