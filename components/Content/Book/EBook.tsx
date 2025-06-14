import React from "react";
import { CategoryResponse } from "@/utils/testing/types";
import Link from "next/link";
import { toSlug } from "@/utils/slug";
interface EBookProps {
  categories: CategoryResponse[];
}
const EBook = ({ categories }: EBookProps) => {
  return (
    <div className="grid grid-collum-140 gap-05">
      {categories.map((Categories) => (
        <Link href={`/article/${toSlug(Categories.name)}`}
          key={Categories.id}
          className="bookCard relative border-custom radius-10-custom ovenflow-hidden b-black"
        >
          <div className="flex-col jus-between item-f-c h-100-persen">
            <button className="merienda text-c w-100 p-06 ovenflow-hidden ovenflow-hidden">
              <h3 className="bookTitle fs-08 fw-700 m-b-03 ovenflow-hidden">
                {Categories.name}
              </h3>
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EBook;
