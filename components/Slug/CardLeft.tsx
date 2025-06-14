import Image from "next/image";
import React from "react";
import style from "@/style/Slug/CardLeft.module.css";
import Link from "next/link";
import { toSlug } from "@/utils/slug";
import { ArticleResponse } from "@/utils/testing/types";
import { stripHtml } from "@/utils/testing/Scripting";

interface LeftCardProps {
  algor: ArticleResponse[];
  article: ArticleResponse | undefined;
}
const CardLeft = ({ algor }: LeftCardProps) => {
  const maxAlgor = algor.slice(0, 3);
  return (
    <div className={style.cardLeftContainer}>
      {maxAlgor.map((alg) => (
        <div key={`${alg.id}`} className={style.cardLeft}>
          <div className={style.imageCard}>
            <Image
              src={alg.imageUrl || "/naliverse/noimage.webp"}
              className={style.imagesCard}
              alt={alg.title || "Title"}
              height={300}
              width={300}
              quality={100}
            />
          </div>
          <Link
            href={`/article/${toSlug(alg.category.name)}/${toSlug(alg.title)}`}
            className={style.TitleDescripsi}
          >
            <h2 className={style.titleCard}>{alg.title}</h2>
            <div className={style.descripsiCard}>
              <p className={style.description}>
                {stripHtml(alg.content).slice(0, 100)}...
              </p>
              <div className={style.infoCard}>
                <span>{alg.user.username}</span>
                <span>
                  {new Date(alg.updatedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardLeft;
