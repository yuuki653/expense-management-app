import React, { useState, memo } from "react";
import { Category, Expense } from "../types/index";
import { isDuplicationCategory } from "../utils/categoryUtils";

interface CategoryListProps {
  category: Category;
  categories: Category[];
  setCategories: ([]: Category[]) => void;
  expenses: Expense[];
}

const CategoryList: React.FC<CategoryListProps> = ({
  category,
  categories,
  setCategories,
  expenses,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const handleEditStart = (category: Category) => {
    setEditingId(category.id);
    setEditCategoryName(category.name);
  };

  const handleEditSave = (id: string) => {
    if (!editCategoryName) {
      alert("カテゴリー名を入力してください");
      setEditCategoryName(category.name);
      return;
    }
    const otherCategories = categories.filter((cat) => cat.id !== category.id);
    if (isDuplicationCategory(editCategoryName, otherCategories)) {
      alert("同じカテゴリー名があります");
      setEditCategoryName(category.name);
      return;
    }
    setCategories(
      categories.map((category) =>
        category.id === id
          ? {
              ...category,
              id: editCategoryName.toLowerCase().replace(/\s+/g, "_"),
              name: editCategoryName,
            }
          : category
      )
    );
    setEditingId(null);
    setEditCategoryName("");
  };

  const handledeleteCategory = (deleteId: string) => {
    const relatedExpenses = expenses.filter(
      (expense) => expense.category === deleteId
    );
    if (relatedExpenses.length > 0) {
      const targetCategory = categories.find(
        (category) => category.id === deleteId
      );
      const newCategoryList = categories.map((category) =>
        category.id === deleteId
          ? {
              ...category,
              name: `削除済み(${targetCategory?.name})`,
              deleted: true,
            }
          : category
      );
      setCategories(newCategoryList);
    } else {
      const newCategoryList = categories.filter(
        (category) => category.id !== deleteId
      );
      setCategories(newCategoryList);
    }
  };

  return (
    <li className="mb-2">
      <div className="flex items-center bg-yellow-100 px-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3Zm9 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM11.5 6A.75.75 0 1 1 13 6a.75.75 0 0 1-1.5 0Z"
            clipRule="evenodd"
          />
          <path d="M13 11.75a.75.75 0 0 0-1.5 0v.179c0 .15-.138.28-.306.255A65.277 65.277 0 0 0 1.75 11.5a.75.75 0 0 0 0 1.5c3.135 0 6.215.228 9.227.668A1.764 1.764 0 0 0 13 11.928v-.178Z" />
        </svg>
        {editingId === category.id ? (
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
        ) : (
          <p className="flex items-center text-left ml-4">{category.name}</p>
        )}
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4 ml-8"
        >
          <path
            fillRule="evenodd"
            d="M12.78 7.595a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06l3.25 3.25Zm-8.25-3.25 3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        {editingId === category.id ? (
          <>
            <button
              onClick={() => handleEditSave(category.id)}
              className="ml-2 hover:underline decoration-2 underline-offset-4 text-blue-400 hover:text-blue-800 rounded-md transition-colors"
            >
              保存
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="ml-2 hover:underline decoration-2 underline-offset-4 text-red-400 hover:text-red-800 rounded-md transition-colors"
            >
              キャンセル
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleEditStart(category)}
              className="ml-2 hover:underline decoration-2 underline-offset-4 text-blue-400 hover:text-blue-800 rounded-md transition-colors"
            >
              編集
            </button>
            <button
              onClick={() => handledeleteCategory(category.id)}
              className="ml-2 hover:underline decoration-2 underline-offset-4 text-red-400 hover:text-red-800 rounded-md transition-colors"
            >
              削除
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default CategoryList;
