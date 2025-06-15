"use server";
import { toSlug } from "@/utils/slug";
import style from "@/style/Slug/ContainerBook.module.css";
import { BiSolidDownArrowAlt } from "react-icons/bi";
import { allArticle, allCategories } from "@/lib/config/testing/axios";
import BookImage from "@/components/Slug/Page/BookImage";
import BookDescripsi from "@/components/Slug/Page/BookDescripsi";
import CardLeft from "@/components/Slug/CardLeft";
import BookContent from "@/components/Slug/Page/BookContent";
import NotFound from "@/components/Error/NotFound";

interface PageProps {
  params: { slug: string; chapter: string };
}
export default async function Page({ params }: PageProps) {
  const { slug, chapter } = params;

  const category = await allCategories();
  const article = await allArticle();
  const categories = category.data;
  const articles = article.data;

  const matchedCategory = categories.find((cat) => toSlug(cat.name) === slug);
  if (!matchedCategory) {
    return (
      <NotFound
        title="Artikel Tidak Ditemukan"
        description="Sepertinya artikel ini telah dihapus atau tidak tersedia di category"
        redirectTo="/article"
      />
    );
  }
  const filteredArticles = articles.filter(
    (art) => art.categoryId === matchedCategory.id
  );
  const articleParams = filteredArticles.find(
    (arts) => toSlug(arts.title) === chapter
  );
  return (
    <main className={style.containerBookSlug}>
      <div className={style.Bookinfo}>
        <h1 className={style.BookTitle}>{articleParams?.title}</h1>
      </div>
      <section className={style.containerBook}>
        <div className={style.bookRight}>
          <BookImage article={articleParams} />
          <BookDescripsi article={articleParams} />
          <BookContent article={articleParams} />
        </div>
        <div className={style.bookLeft}>
          <div className={style.typeBook}>
            Type Books <BiSolidDownArrowAlt />
          </div>
          <div className={style.gendreBook}>
            <h3 className={style.titleGendre}>Gendre</h3>
            <div className={style.listGendre}></div>
          </div>
          <CardLeft algor={filteredArticles} article={articleParams} />
        </div>
      </section>
    </main>
  );
}
