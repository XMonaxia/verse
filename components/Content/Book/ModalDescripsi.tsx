import React from "react";
import Image from "next/image";
import { ArticleResponse } from "@/utils/testing/types";
interface DescripsiProps {
  articles: ArticleResponse;
}
const ModalDescripsi = ({ articles }: DescripsiProps) => {
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
          <h3>Author : @{articles.user.username}</h3>
          <p className="c-main-site-blue fs-1-02 sm-fs-1">
            {articles.category.name}
          </p>
          <p className="c-hover-whites">{articles.user.role}</p>
        </div>
      </div>
      <div className="h-100-persen border-t-custom border-r-custom p-06 radius-10-custom">
        <div className="m-l-1-05 c-hover-whites text-l">
          <div className="flex-wrap m-t-01">
            <b>Create : </b>{" "}
            {new Date(articles.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div>
            <b>Update :</b>{" "}
            {new Date(articles.updatedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalDescripsi;
