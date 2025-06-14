"use client";
import React from "react";
import style from "@/style/Slug/page/BookDescription.module.css";
import Image from "next/image";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineSaveAlt } from "react-icons/md";
import { ArticleResponse } from "@/utils/testing/types";
import toast from "react-hot-toast";
interface BookDescripsiProps {
  article: ArticleResponse | undefined;
}
const BookDescripsi = ({ article }: BookDescripsiProps) => {
  const handleShare = async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      toast.error("Fitur ini hanya tersedia di browser.");
      return;
    }
    if (!navigator.share) {
      toast("Fitur share tidak didukung di browser ini.", { icon: "⚠️" });
      return;
    }
    if (!article) {
      toast.error("Artikel tidak ditemukan.");
      return;
    }
    try {
      await navigator.share({
        title: article.title || "Bagikan Artikel",
        text: "Lihat artikel ini!",
        url: window.location.href,
      });
      toast.success("Bagikan Article Ini!");
    } catch (error) {
      console.error("Gagal membagikan artikel:", error);
      toast.error("Gagal membagikan artikel.");
    }
  };

  return (
    <div className={style.descripsiBook}>
      <div className={style.authorBook}>
        <Image
          src={article?.imageUrl || "/naliverse/noimage.webp"}
          alt={article?.title || "Gambar User"}
          className={style.imagesAuthor}
          height={100}
          width={100}
          quality={100}
          priority
        />
        <div className={style.authorDescripsi}>
          <h2 className={style.authorName}>{article?.user.username}</h2>
          <p className={style.infoauthor}>{article?.user.role || "User"}</p>
        </div>
        <button className={style.followAuthor}>Follow</button>
      </div>
      <div className={style.actionButtonBookbottom}>
        <div className={style.buttonActionShareds}>
          <button className={style.likes}>
            <AiOutlineLike />
            <span className={style.like}>34</span>
          </button>
          <div className={style.skat} />
          <button className={style.dislikes}>
            <AiOutlineDislike />
          </button>
        </div>
        <button className={style.buttonActionShared}>
          <MdOutlineSaveAlt />
        </button>
        <button className={style.buttonActionShared} onClick={handleShare}>
          <IoIosShareAlt />
        </button>
      </div>
    </div>
  );
};

export default BookDescripsi;
