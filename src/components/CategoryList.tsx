import React, { useState } from "react";
import { Category } from "../types/index";

interface CategoryListProps {
  category: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ category }) => {
  return (
    <li className="w-[80%] mx-auto">
      <div className="flex justify-between items-center">
        <p className="w-40 text-left">{category}</p>
        <span>
          <button className="ml-3">編集</button>
          <button className="ml-2">削除</button>
        </span>
      </div>
    </li>
  );
};

export default CategoryList;
