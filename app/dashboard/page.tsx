import { allCategories } from "@/lib/config/testing/axios";
import React from "react";
import ListCategory from "./ListCategory";

export default async function page() {
  const allCategory = await allCategories();
  const all = allCategory.data;
  return <ListCategory all={all} />;
}
