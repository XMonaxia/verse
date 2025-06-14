"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { ModalTabsContext, ModalTabsSharedData } from "./ModalTabsContext";
interface ModalTabsProps {
  show: boolean;
  onClose: () => void;
  tabs: string[];
  contents: ReactNode[];
  externalIndex?: number;
  onTabChange?: (tabs: number) => void;
  sharedData?: ModalTabsSharedData;
  setSharedData?: React.Dispatch<React.SetStateAction<ModalTabsSharedData>>;
}
const ModalTabs: React.FC<ModalTabsProps> = ({
  show,
  onClose,
  tabs,
  contents,
  externalIndex,
  onTabChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sharedData, setSharedData] = useState<ModalTabsSharedData>({});
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [containerHeight, setContainerHeight] = useState<string | number>(
    "auto"
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const goToTab = (tabs: number) => {
    setCurrentIndex(tabs);
    onTabChange?.(tabs);
  };
  const handleTouch = {
    start: (e: React.TouchEvent) =>
      (touchStartX.current = e.touches[0].clientX),
    move: (e: React.TouchEvent) => (touchEndX.current = e.touches[0].clientX),
    end: () => {
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 100 && currentIndex < tabs.length - 1) {
          goToTab(currentIndex + 1);
        } else if (diff < -100 && currentIndex > 0) {
          goToTab(currentIndex - 1);
        }
      }
      touchStartX.current = null;
      touchEndX.current = null;
    },
  };
  useEffect(() => {
    const html = document.documentElement;
    const underline = underlineRef.current;
    const currentTab = tabRefs.current[currentIndex];
    const activeSlide = slideRefs.current[currentIndex];
    if (typeof externalIndex === "number") {
      setCurrentIndex(externalIndex);
    }
    if (show) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
    }
    if (activeSlide) {
      const height = activeSlide.scrollHeight;
      setContainerHeight(height);
    }
    if (underline && currentTab) {
      const rect = currentTab.getBoundingClientRect();
      const containerRect = currentTab.parentElement?.getBoundingClientRect();
      if (containerRect) {
        underline.style.width = `${rect.width}px`;
        underline.style.transform = `translateX(${
          rect.left - containerRect.left
        }px)`;
      }
    }
  }, [currentIndex, show, externalIndex]);
  if (!show) return;
  return (
    <ModalTabsContext.Provider value={{ goToTab, sharedData, setSharedData }}>
      <div
        className="fixed inset-0 flex item-f-c jus-c b-black-opacity-low backdrop-3 h-100 w-100 padding-notfound z-1600"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="radius-10-custom border-custom shadow-white b-black w-100 max-w-700 max-h-60 ovenflow-y-auto will-change-trans-opacity animate-FadeIn trans-height-05 z-10 webkitnone">
          <div className="sticky top-0 flex text-c border-b-custom backdrop-5 z-10">
            <button
              className="absolute top-min-04 right-0 p-tb-03-lr-05 radius-10-custom border-b-custom border-l-custom c-hover-white b-hover-white-opacity z-15 fs-1-05 trans-color-bg-03"
              onClick={onClose}
            >
              ×
            </button>
            {tabs.map((tab, modal) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[modal] = el;
                }}
                className={`flex-1 p-1 fw-700 c-hover-white relative b-black-opacity trans-color-bg-03 z-1 md-fs-09 ${
                  currentIndex === modal ? "c-white" : ""
                }`}
                onClick={() => goToTab(modal)}
              >
                {tab}
              </button>
            ))}
            <span
              ref={underlineRef}
              className="absolute bottom-0 h-2px b-hover-white z-15 will-change-trans-width trans-fransform-width-03"
            />
          </div>
          <div
            className="ovenflow-hidden w-100 relative trans-fransform-height-03 will-change-trans-height"
            style={{ height: containerHeight }}
            onTouchStart={handleTouch.start}
            onTouchMove={handleTouch.move}
            onTouchEnd={handleTouch.end}
          >
            <div
              className="flex trans-fransform-height-03 will-change-trans-height"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {contents.map((content, modals) => (
                <div
                  className="w-100 flex-shirnk-0 p-06 min-h-max-content animate-fadeSlide"
                  key={
                    currentIndex === modals
                      ? `active-${modals}`
                      : `inactive-${modals}`
                  }
                >
                  {currentIndex === modals ? content : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalTabsContext.Provider>
  );
};

export default ModalTabs;
