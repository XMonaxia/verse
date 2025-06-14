"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useModalTabs } from "@/components/Provider/ModalTabsContext";
import { ArticleResponse } from "@/utils/testing/types";
import { autoLink } from "@/utils/testing/Scripting";
import toast from "react-hot-toast";

interface BookModalProps {
  articles: ArticleResponse;
}
const ModalBook = ({ articles }: BookModalProps) => {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".contentPembuka pre");
    codeBlocks.forEach((block) => {
      const code = block.querySelector("code");
      if (!code) return;
      if (block.querySelector("button.copy-btn")) return;
      const button = document.createElement("button");
      button.className = "copy-btn";
      button.innerText = "Copy";
      button.addEventListener("click", () => {
        const text = code.innerText || "";
        navigator.clipboard.writeText(text).then(() => {
          button.innerText = "Copied!";
          toast.success("Copied to clipboard!");
          setTimeout(() => (button.innerText = "Copy"), 3000);
        });
      });
      block.appendChild(button);
    });
    const images = document.querySelectorAll(".contentPembuka img");
    (images as NodeListOf<HTMLImageElement>).forEach((img) => {
      img.style.width = "100%";
      img.style.height = "300px";
      img.style.objectFit = "cover";
      img.style.display = "block";
      img.style.borderRadius = "0 10px 0 10px";
    });
  }, []);
  const { goToTab } = useModalTabs();
  return (
    <div className="flex-col h-100-persen gap-1 p-04">
      <div className="flex-center gap-1 sm-flex-col sm-gap-05">
        <Image
          width={100}
          height={100}
          quality={100}
          src={articles.imageUrl || "/naliverse/noimage.webp"}
          alt={`Foto ${articles.title}`}
          className="radius-10-custom w-100px h-100px object-c sm-w-80px sm-h-80px"
        />
        <div className="sm-text-c flex-1 w-100 text-l">
          <h3>{articles.title}</h3>
          <div className="flex-wrap gap-1 m-tb-05 c-hover-whites trans-color-03 sm-jus-arounded">
            <span className="flex gap-03">
              Create
              <b>
                {new Date(articles.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </b>
            </span>
            <span className="flex gap-03">
              Update
              <b>
                {new Date(articles.updatedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </b>
            </span>
          </div>
          <div className="flex gap-05 sm-jus-between">
            <button
              className="sendBtn sm-w-100 relative fw-700 p-tb-05-lr-1 radius-10-custom border-custom c-hover-white z-1"
              onClick={() => goToTab(2)}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className="h-100-persen border-t-custom border-r-custom p-06 radius-10-custom">
        <div
          className="contentPembuka"
          dangerouslySetInnerHTML={{ __html: autoLink(articles.content) }}
        />
      </div>
    </div>
  );
};

export default ModalBook;
