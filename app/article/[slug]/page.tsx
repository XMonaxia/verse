"use server";
import { allArticle, allCategories } from "@/lib/config/testing/axios";
import { toSlug } from "@/utils/slug";
import Link from "next/link";
import React from "react";
import style from "./Slug.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import { stripHtml } from "@/utils/testing/Scripting";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const category = await allCategories();
  const article = await allArticle();
  const categories = category.data;
  const articles = article.data;

  const matchedCategory = categories.find((cat) => toSlug(cat.name) === slug);
  if (!matchedCategory) {
    return notFound();
  }
  const filteredArticles = articles.filter(
    (art) => art.categoryId === matchedCategory.id
  );

  return (
    <div>
      <main className={style.containerMain}>
        <section className={style.carouselCategory}>
          <div className={style.category}>
            <div className={style.categoryButton}>
              {categories.map((category) => {
                const isActive = toSlug(category.name) === slug;
                return (
                  <Link
                    href={`/article/${toSlug(category.name)}`}
                    key={category.id}
                  >
                    <div
                      className={`${style.btncategory} ${
                        isActive ? style.activeCategory : ""
                      }`}
                    >
                      {category.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <section className="grid grid-collum-book gap-05 p-1">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bookCard relative border-custom radius-10-custom ovenflow-hidden b-black"
              >
                <div className="bookActions absolute flex-col gap-03 z-10 opacity-0 right-03 top-03 pointer-none">
                  <button className="actionButton b-black-opacity fs-1">
                    ❤️
                  </button>
                  <button className="actionButton b-black-opacity fs-1">
                    📌
                  </button>
                </div>
                <div className="flex-col jus-between item-f-c h-100-persen">
                  <Image
                    src={art.imageUrl || "/naliverse/noimage.webp"}
                    alt={art.title}
                    className="bookImages"
                    width={500}
                    height={500}
                    quality={100}
                  />
                  <Link
                    href={`/article/${toSlug(art.category.name)}/${toSlug(
                      art.title
                    )}`}
                    className="merienda w-100 p-06 ovenflow-hidden ovenflow-hidden"
                  >
                    <h3 className="bookTitle fs-08 fw-700 m-b-03 ovenflow-hidden">
                      {art.title}
                    </h3>
                    <p className="bookDesc ovenflow-hidden fs-06 c-hover-whites">
                      {stripHtml(art.content)}
                    </p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-c c-red">
              Artikel tidak tersedia dalam kategori ini.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
