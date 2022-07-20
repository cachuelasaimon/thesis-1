import { BaseSchema } from "yup";

export interface IItem extends BaseSchema {
  quantity: number;
  variant?: string;
  productId: string;
  status: "checked_out" | "removed" | "active";
  show: boolean;
}

export type INewCartItem = Omit<IItem, "id" | "createdAt">;
