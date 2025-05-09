import { LucideIcon } from "lucide-react";

export type ResType<T = null> = {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
};

export interface Option {
  label: string;
  value: string;
  icon?: LucideIcon;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}
