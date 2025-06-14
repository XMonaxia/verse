import React from "react";
import Image from "next/image";
import { MdOutlineBookmark } from "react-icons/md";
import style from "./Book.module.css";

const StartBook = () => {
  return (
    <section className="w-100 flex-col item-c jus-c text-c radius-10-custom border-custom max-w-1000 gap-05 relative m-t-5vh">
      <div className={style.bookCard}>
        <Image
          src="/naliverse/naliverse.webp"
          alt="Narali Literasi"
          className={style.images}
          width={500}
          height={500}
          quality={100}
          priority
        />
        <div className={style.bookMark}>
          <MdOutlineBookmark size={40} />
        </div>
      </div>
      <h2 className={style.titleBook}>Narasi Literasi Universal</h2>
      <p className={style.descriptionBook}>Naliverse</p>
      <button className={style.startButton}>Coming Soon →</button>
      <div className={style.SVGContainers}>
        <svg
          className={style.gridoverlay}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 11 }).map((_, svg) => (
            <circle
              key={`c-${svg}`}
              cx="100"
              cy="100"
              r={`${svg * 13}`}
              className={style.gridline}
              fill="none"
            />
          ))}
          {Array.from({ length: 11 }).map((_, svg) => {
            const angle = (svg * Math.PI) / 10;
            return (
              <line
                key={`r-${svg}`}
                x1="100"
                y1="100"
                x2={100 + Math.cos(angle) * 100}
                y2={100 + Math.sin(angle) * 100}
                className={style.gridline}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default StartBook;
