"use client";
import Image from "next/image";
import style from "./NotFound.module.css";
export default function GlobalError({
  error,
  resetAction,
}: {
  error: Error & { digest?: string };
  resetAction: () => void;
}) {
  return (
    <section className={style.container}>
      <div className={style.overlay} />
      <Image
        className={style.image}
        src="/naliverse/notfound.webp"
        height={1500}
        width={1500}
        quality={100}
        alt={"Not Found"}
        priority
      />
      <h1 className={style.title}>Page ERROR</h1>
      <h2 className={style.count}>500</h2>
      <div className={style.current}>
        <p className={style.des}>
          {error.message.includes("Programer Kami mengalami DEHIDRASI!")}
          Sory !!!
        </p>
        <button className={style.back} onClick={resetAction}>
          Refresh
        </button>
        <p className={style.des}>
          ©{new Date().getFullYear()} FrontEnd PT. Seller Pintar, Testing
        </p>
      </div>
    </section>
  );
}
