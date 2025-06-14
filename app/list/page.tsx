import { CategoryProvider } from "@/components/Admin/Add/CategoryContext";
import React from "react";
import CategoryListEditor from "./list";

export default function page() {
  return (
    <CategoryProvider>
      <CategoryListEditor />
    </CategoryProvider>
  );
}
