"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImageHomeTypes } from "@/model/ImageHome";
interface CarouselProps {
  images: ImageHomeTypes[];
}
const Carousel = ({ images }: CarouselProps) => {
  const [image, setImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute w-100 h-100 z-0">
      <div className="absolute z-2 custom-baground-image-carousel inset-0" />
      {images.map((imagess, id) => (
        <Image
          key={imagess._id}
          src={imagess.src}
          alt={`Slide ${imagess.title}`}
          fill
          sizes="100vw"
          quality={100}
          priority
          className={`object-c w-100 h-100 opacity-0 trans-opacity-15 ${
            id === image ? "opacity-1 z-1" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default Carousel;
