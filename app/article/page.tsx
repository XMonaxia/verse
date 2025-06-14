import React from "react";
import style from "./Book.module.css";
import { GiBlackBook } from "react-icons/gi";
import { Metadata } from "next";
import { BookMetadata } from "@/lib/seo/metadata";
import AllBook from "./AllBook";
import { allArticle } from "@/lib/config/testing/axios";
import StartBook from "./StartBook";

export const metadata: Metadata = BookMetadata;
export default async function Book() {
  const Article = await allArticle();

  const article = Article.data;
  // const books = allBooks.length > 3 ? allBooks.slice(0, 3) : allBooks;
  return (
    <main className="relative flex-col item-c min-h-100 p-tb-5-rl-01">
      <h1 className="text-c fw-800 fs-2 md-fs-1-8 sm-fs-1-4">
        Start Learn With Naliverse
      </h1>
      <p className="text-c max-w-700 m-b-5vh c-hover-whites md-fs-09 sm-fs-08">
        Buku ini ditampilkan sebagai hasil dari filter topik unggulan, Menyoroti
        konten yang paling relevan dan kami merekomendasi buku ini.
      </p>
      <StartBook />
      <section className={style.doc}>
        <div className={style.docInfo}>
          <div className={style.docIcon}>
            <GiBlackBook />
          </div>
          <div className={style.docText}>
            <h3 className={style.titles}>All E-Books</h3>
            <p className={style.docdescripsi}>Find Your Favorite Book</p>
          </div>
        </div>
      </section>
      <AllBook article={article} />
    </main>
  );
}
