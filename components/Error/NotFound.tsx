"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import style from "./NotFound.module.css";

const NotFound = () => {
  const [count, setCount] = useState(4);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    if (count === 0) {
      router.replace("/");
    }
    return () => clearInterval(interval);
  }, [count, router]);
  const handleBackClick = () => {
    router.replace("/");
  };
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
      <h1 className={style.title}>Page Not Found</h1>
      <h2 className={style.count}>40{count}</h2>
      <div className={style.current}>
        <p className={style.des}>
          Nothing Special Other Than What Is Show || XD
        </p>
        <button className={style.back} onClick={handleBackClick}>
          Kembali
        </button>
        <p className={style.des}>
          ©{new Date().getFullYear()} FrontEnd PT. Seller Pintar, Testing
        </p>
      </div>
    </section>
  );
};

export default NotFound;
