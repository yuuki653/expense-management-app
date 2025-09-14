import React, { useState } from "react";

import CategoryList from "./CategoryList";
import { Category, Expense } from "../types/index";
import { isDuplicationCategory } from "../utils/categoryUtils";

interface AddCategoryProps {
  categories: Category[];
  setCategories: ([]: Category[]) => void;
  expenses: Expense[];
}

const AddCategory: React.FC<AddCategoryProps> = ({
  categories,
  setCategories,
  expenses,
}) => {
  const [category, setCategory] = useState<string>("");

  const handleAddCategory = (name: string) => {
    if (!name) {
      alert("カテゴリー名を入力してください");
      return;
    }
    if (isDuplicationCategory(category, categories)) {
      alert("同じカテゴリー名があります");
      return;
    }
    const newCategory: Category = {
      id: name.toLowerCase().replace(/\s+/g, "_"),
      name,
    };
    setCategories([...categories, newCategory]);
    setCategory("");
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex justify-center items-center gap-1 my-5 ">
        <input
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (isDuplicationCategory(category, categories)) {
                alert("同じカテゴリー名があります");
                return;
              }
              handleAddCategory(category);
              setCategory("");
            }
          }}
          placeholder="新しいカテゴリー"
          className="w-44 h-9 border-2 rounded-md border-gray-500 px-2"
        />
        <button
          onClick={() => handleAddCategory(category)}
          className="w-14 h-9 text-green-700 underline decoration-2 underline-offset-4 px-3 hover:bg-green-400 hover:text-gray-100 rounded-md transition-colors"
        >
          追加
        </button>
      </div>
      <ul className="w-60 mx-auto">
        {categories.map((category) => (
          <CategoryList
            key={category.id}
            category={category}
            categories={categories}
            setCategories={setCategories}
            expenses={expenses}
          />
        ))}
      </ul>
    </div>
  );
};

export default AddCategory;
