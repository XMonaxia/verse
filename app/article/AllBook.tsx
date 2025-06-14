import { toSlug } from "@/utils/slug";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArticleResponse } from "@/utils/testing/types";
import { stripHtml } from "@/utils/testing/Scripting";
interface AllBookProps {
  article: ArticleResponse[];
}
const AllBook = ({ article }: AllBookProps) => {
  return (
    <section className="grid grid-collum-book gap-05">
      {article.map((article) => (
        <div
          key={article.id}
          className="bookCard relative border-custom radius-10-custom ovenflow-hidden b-black"
        >
          <div className="bookActions absolute flex-col gap-03 z-10 opacity-0 right-03 top-03 pointer-none">
            <button className="actionButton b-black-opacity fs-1">❤️</button>
            <button className="actionButton b-black-opacity fs-1">📌</button>
          </div>
          <div className="flex-col jus-between item-f-c h-100-persen">
            <Image
              src={article.imageUrl || "/naliverse/noimage.webp"}
              alt={article.title || "Images Article"}
              className="bookImages"
              width={500}
              height={500}
              quality={100}
            />
            <Link
              href={`/article/${toSlug(article.category.name)}/${toSlug(
                article.title
              )}`}
              className="merienda w-100 p-06 ovenflow-hidden ovenflow-hidden"
            >
              <h3 className="bookTitle fs-08 fw-700 m-b-03 ovenflow-hidden">
                {article.title}
              </h3>
              <p className="bookDesc ovenflow-hidden fs-06 c-hover-whites">
                {stripHtml(article.content)}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AllBook;
