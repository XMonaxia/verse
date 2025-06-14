import React from "react";
import Image from "next/image";
import style from "@/style/Slug/page/BookImage.module.css";
import { ArticleResponse } from "@/utils/testing/types";
interface BookImageProps {
  article: ArticleResponse | undefined;
}
const BookImage = ({ article }: BookImageProps) => {
  return (
    <div className={style.bookImage}>
      <Image
        src={article?.imageUrl || "/naliverse/noimage.webp"}
        className={style.image}
        alt={article?.title || "Article Gambar"}
        height={200}
        width={200}
        quality={100}
        priority
      />
    </div>
  );
};

export default BookImage;
