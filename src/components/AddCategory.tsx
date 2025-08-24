import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";
import { Category } from "../types/index";
import { isDuplicationCategory } from "../utils/categoryUtils";

interface AddCategoryProps {
  addCategory: (name: string) => void;
  categories: Category[];
}

const AddCategory: React.FC<AddCategoryProps> = ({
  addCategory,
  categories,
}) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");

  const handleAdd = () => {
    if (isDuplicationCategory(category, categories)) {
      alert("同じカテゴリー名があります");
      return;
    }
    addCategory(category);
    setCategory("");
  };

  return (
    <div className="w-[50%] mx-auto">
      <div className="bg-gray-100 rounded-md p-8 mt-10 text-center">
        <button
          className="text-green-600 underline decoration-2 underline-offset-4 text-sm hover:text-green-700 transition-colors"
          onClick={() => {
            navigate(-1);
          }}
        >
          戻る
        </button>
        <p className="text-xl font-bold mb-5">カテゴリー管理</p>
        <div className="flex justify-center gap-1 mb-5">
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
                addCategory(category);
                setCategory("");
              }
            }}
            placeholder="新しいカテゴリー"
            className="h-9 w-40 border-2 rounded-md border-gray-500 px-2"
          />
          <button
            onClick={handleAdd}
            className="h-9 w-16 border-2 border-green-800 bg-green-300 hover:bg-green-500 rounded-md px-3 flex items-center justify-center transition-colors"
          >
            追加
          </button>
        </div>
        <ul>
          {categories.map((category) => (
            <CategoryList key={category.id} category={category.name} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
