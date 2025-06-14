"use client";
import { useState } from "react";
import Content from "@/components/Content/Content";
import Parallax from "@/components/Content/Parallax";
import ModalTabs from "../Provider/ModalTabs";
import AccountSkeleton from "@/components/Loading/Shortcut/Account";
import Search from "../Priority/Search";
import dynamic from "next/dynamic";
import { ArticleResponse, CategoryResponse } from "@/utils/testing/types";
import ModalAuth from "../Auth/ModalAuth";
import Login from "../Auth/Login/Login";
import { useAuth } from "../Provider/AuthWrapper";

const ModalBook = dynamic(() => import("@/components/Content/Book/ModalBook"), {
  ssr: false,
  loading: () => <AccountSkeleton />,
});
const ModalDescripsi = dynamic(
  () => import("@/components/Content/Book/ModalDescripsi"),
  {
    ssr: false,
    loading: () => <AccountSkeleton />,
  }
);
const ModalComment = dynamic(
  () => import("@/components/Content/Book/ModalComment"),
  {
    ssr: false,
    loading: () => <AccountSkeleton />,
  }
);

interface ExploreProps {
  articles: ArticleResponse[];
  categories: CategoryResponse[];
}
const ExploreBook = ({ articles, categories }: ExploreProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleResponse>();
  const [activeModalTabIndex, setActiveModalTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const { isLoggedIn, refreshUser } = useAuth();
  const [showModalLogin, setShowModalLogin] = useState(false);
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleOpenModal = (article: ArticleResponse) => {
    if (isLoggedIn) {
      setSelectedArticle(article);
      setShowModal(true);
    } else {
      setShowModalLogin(true);
    }
  };
  return (
    <>
      <Parallax speed={0.5}>
        <h2 className="m-t-7vh m-b-05 merienda fw-700 text-c z-10 fontExploreBook c-hover-white trans-color-03 md-fs-2 sm-fs-1-4">
          EXPLORE ARTICLES
        </h2>
        <Search search={search} setSearch={setSearch} />
        <div className="radius-10-custom w-100 ovenflow-hidden z-3 b-black-opacity border-custom">
          <Content
            articles={filteredArticles}
            categories={categories}
            onBookClick={handleOpenModal}
          />
        </div>
      </Parallax>
      <ModalTabs
        show={showModal && selectedArticle !== undefined}
        onClose={() => {
          setShowModal(false);
          setActiveModalTabIndex(0);
        }}
        tabs={["Article", "Info", "Comment"]}
        externalIndex={activeModalTabIndex}
        onTabChange={setActiveModalTabIndex}
        contents={[
          selectedArticle ? (
            <ModalBook key="Article" articles={selectedArticle} />
          ) : (
            <AccountSkeleton />
          ),
          selectedArticle ? (
            <ModalDescripsi key="Infos" articles={selectedArticle} />
          ) : (
            <AccountSkeleton />
          ),
          !selectedArticle ? (
            <ModalComment key="Comments" articles={selectedArticle} />
          ) : (
            <AccountSkeleton />
          ),
        ]}
      />
      <ModalAuth show={showModalLogin} onClose={() => setShowModalLogin(false)}>
        <Login
          onLoginSuccess={async () => {
            await refreshUser();
            setShowModalLogin(false);
          }}
        />
      </ModalAuth>
    </>
  );
};

export default ExploreBook;
