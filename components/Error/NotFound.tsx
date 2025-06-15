"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import style from "@/style/NotFound.module.css";

interface NotFoundProps {
  title?: string;
  description?: string;
  redirectTo?: string;
}

const NotFound = ({
  title = "Page Not Found",
  description = "Nothing Special Other Than What Is Show || XD",
  redirectTo = "/",
}: NotFoundProps) => {
  const [count, setCount] = useState(4);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    if (count === 0) {
      router.replace(redirectTo);
    }
    return () => clearInterval(interval);
  }, [count, router, redirectTo]);

  const handleBackClick = () => {
    router.replace(redirectTo);
  };

  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <div className={style.overlay} />
        <Image
          className={style.image}
          src="/naliverse/notfound.webp"
          height={1000}
          width={1000}
          quality={100}
          alt={"Not Found"}
          priority
        />
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.count}>40{count}</h2>
        <div className={style.current}>
          <p className={style.des}>{description}</p>
          <button className={style.back} onClick={handleBackClick}>
            Kembali
          </button>
          <p className={style.des}>
            ©{new Date().getFullYear()} FrontEnd PT. Seller Pintar, Testing
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
