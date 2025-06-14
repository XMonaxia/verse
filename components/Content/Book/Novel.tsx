"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleResponse } from "@/utils/testing/types";
import { stripHtml } from "@/utils/testing/Scripting";
import { useAuth } from "@/components/Provider/AuthWrapper";
import { toSlug } from "@/utils/slug";

interface NovelProps {
  articles: ArticleResponse[];
  onBookClick: (articles: ArticleResponse) => void;
}
const Novel = ({ articles, onBookClick }: NovelProps) => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="grid grid-collum-book gap-05">
      {articles.map((articles) => (
        <div
          key={articles.id}
          className="bookCard relative border-custom radius-10-custom ovenflow-hidden b-black"
        >
          <div className="bookActions absolute flex-col gap-03 z-10 opacity-0 right-03 top-03 pointer-none">
            <button className="actionButton b-black-opacity fs-1">❤️</button>
            <button className="actionButton b-black-opacity fs-1">📌</button>
          </div>
          <div className="flex-col jus-between item-f-c h-100-persen">
            <Image
              src={articles.imageUrl || "/naliverse/noimage.webp"}
              alt={`Images ${articles.title}`}
              className="bookImage"
              width={500}
              height={500}
              quality={100}
            />
            <button
              className="merienda w-100 p-06 ovenflow-hidden ovenflow-hidden"
              onClick={() => onBookClick(articles)}
            >
              <h3 className="bookTitle fs-08 fw-700 m-b-03 ovenflow-hidden">
                {articles.title}
              </h3>
              <p className="bookDesc ovenflow-hidden fs-06 c-hover-whites">
                {stripHtml(articles.content).slice(0, 100)}...
              </p>
            </button>
            <Link
              href={`/article/${toSlug(articles.category.name)}/${toSlug(articles.title)}`}
              className="w-100 b-main-site-blue-t text-c c-hover-white trans-color-03 p-tb-05"
            >
              Learn Book
            </Link>
          </div>
        </div>
      ))}
      {isLoggedIn && user?.role === "Admin" && (
        <div className="flex-col item-c jus-c text-c gap-03">
          <Link href="#">
            <div className="flex-center jus-c trans-bg-03 w-70px h-70px fs-3 radius-curcle border-custom bg-hover-white-opacity">
              ＋
            </div>
          </Link>
          <div className="merienda w-100 p-tb-03-lr-05 ovenflow-hidden">
            <h3 className="fs-08">Add Article</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Novel;
