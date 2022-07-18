export interface INewCartItem {
  quantity: number;
  variant?: string;
  productId: string;
  status: "checked_out" | "removed" | "active";
  show: boolean;
}
