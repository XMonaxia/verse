"use server";
import { getImages, getPuisi } from "@/lib/config/axios";
import Carousel from "@/components/Priority/Carousel";
import ExploreBook from "@/components/Content/ExploreBook";
import Descripsi from "@/components/Priority/Descripsi";
import ButtonStarted from "@/components/Priority/ButtonStarted";
import { allArticle, allCategories } from "@/lib/config/testing/axios";

export default async function Index() {
  const [Article, Categories] = await Promise.all([
    allArticle(),
    allCategories(),
  ]);
  const article = Article.data;
  const categories = Categories.data;
  const [puisi, images] = await Promise.all([getPuisi(), getImages()]);
  return (
    <main className="w-100 flex-col item-c">
      <Carousel images={images} />
      <section className="relative w-100 min-h-100 flex-col item-c text.c p-top-10">
        <Descripsi puisi={puisi} />
        <ButtonStarted />
      </section>
      <section className="w-100" id="contentBook">
        <ExploreBook articles={article} categories={categories} />
      </section>
    </main>
  );
}
