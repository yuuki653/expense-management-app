import React from "react";
import AddCategory from "../components/AddCategory";

import { Category } from "../types/index";

interface CategoryManagementPageProps {
  addCategory: (name: string) => void;
  categories: Category[];
}

const CategoryManagementPage: React.FC<CategoryManagementPageProps> = ({
  addCategory,
  categories,
}) => {
  return (
    <>
      <AddCategory addCategory={addCategory} categories={categories} />
    </>
  );
};

export default CategoryManagementPage;
