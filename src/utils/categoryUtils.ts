import { Category } from "../types";

export const getCategoryName = (
  categoryId: string,
  categories: Category[]
): string => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.name : categoryId;
};

export const isDuplicationCategory = (
  newCategoryName: string,
  categories: Category[]
): Boolean => {
  const result = categories.some((cat) => cat.name === newCategoryName);

  return result;
};
