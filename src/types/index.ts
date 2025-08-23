export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  memo?: string;
}

export interface Budget {
  id: string;
  amount: number;
  weekStart: string;
}

export interface Category {
  id: string;
  name: string;
}
