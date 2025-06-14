"use client";
import { useState } from "react";
import TabHeader from "@/components/Content/TabHeader";
import dynamic from "next/dynamic";
import Spinner from "@/components/Loading/Spinner";
import { ArticleResponse, CategoryResponse } from "@/utils/testing/types";
const EBook = dynamic(() => import("@/components/Content/Book/EBook"), {
  ssr: false,
  loading: () => <Spinner />,
});
const Novel = dynamic(() => import("@/components/Content/Book/Novel"), {
  ssr: false,
  loading: () => <Spinner />,
});
interface Props {
  articles: ArticleResponse[];
  categories: CategoryResponse[];
  onBookClick: (articles: ArticleResponse) => void;
  onAddClick: () => void;
}
const tabs = ["Articles", "Category"];
const Content = ({ articles, categories, onBookClick, onAddClick }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <TabHeader
        tabs={tabs}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />
      <div className="max-h-60 webkitnone m-07 ovenflow-y-auto radius-10 p-04">
        {activeIndex === 1 && <EBook categories={categories} />}
        {activeIndex === 0 && (
          <Novel articles={articles} onBookClick={onBookClick} onAddClick={onAddClick} />
        )}
        </div>
    </>
  );
};

export default Content;
