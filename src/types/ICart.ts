import { IItem, BaseSchema } from "types";

export interface ICart extends BaseSchema {
  items: IItem[];
}
