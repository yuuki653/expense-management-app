export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  memo?: string;
}

export interface Budget {
  id: number;
  amount: number;
}

export interface Category {
  id: string;
  name: string;
}
