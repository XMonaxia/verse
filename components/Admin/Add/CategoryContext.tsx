"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { allCategories } from "@/lib/config/testing/axios";
import { CategoryResponse } from "@/utils/testing/types";
type CategoryContextType = {
  categories: CategoryResponse[];
  refreshCategories: () => Promise<void>;
};
const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  refreshCategories: async () => {},
});
export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const refreshCategories = async () => {
    try {
      const res = await allCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Gagal memuat kategori", err);
    }
  };
  useEffect(() => {
    refreshCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ categories, refreshCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
