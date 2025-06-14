"use client";
import React, { useEffect } from "react";
import style from "@/style/Slug/page/BookPembuka.module.css";
import { ArticleResponse } from "@/utils/testing/types";
import { autoLink } from "@/utils/testing/Scripting";
import toast from "react-hot-toast";
interface BookContentProps {
  article?: ArticleResponse | undefined;
}
const BookContent = ({ article }: BookContentProps) => {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre");
    codeBlocks.forEach((block) => {
      if (block.querySelector("button")) return;
      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className = style.copyButton;
      button.onclick = () => {
        const code = block.querySelector("code")?.innerText || "";
        navigator.clipboard.writeText(code).then(() => {
          button.innerText = "Copied!";
          toast.success("Copied to clipboard!");
          setTimeout(() => (button.innerText = "Copy"), 3000);
        });
      };
      block.style.position = "relative";
      block.appendChild(button);
    });
    const images = document.querySelectorAll(`.${style.contentPembuka} img`);
    (images as NodeListOf<HTMLImageElement>).forEach((img) => {
      img.style.width = "100%";
      img.style.height = "400px";
      img.style.objectFit = "cover";
      img.style.display = "block";
      img.style.borderRadius = "0 10px 0 10px";
    });
  });
  if (!article) return <p> Aticle Tidak Ditemukan</p>;
  return (
    <div className={style.ContentBookPembuka}>
      <h2 className={style.penghantarPembuka}>{article?.title}</h2>
      <div
        className={style.contentPembuka}
        dangerouslySetInnerHTML={{
          __html: autoLink(article.content || "Tidak Ada Content"),
        }}
      />
    </div>
  );
};
export default BookContent;
