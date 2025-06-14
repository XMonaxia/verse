"use client";
import { MdOutlineZoomInMap, MdOutlineZoomOutMap } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Look() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed bottom-10px trans-color-03 c-hover-white z-1000 left-10px animatePopIn fs-2 md-fs-1-8"
    >
      {isFullscreen ? <MdOutlineZoomInMap /> : <MdOutlineZoomOutMap />}
    </button>
  );
}
