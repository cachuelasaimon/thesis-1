export interface IProduct {
  doc: any; // ? Firebase Document
  description?: string;
  picture: string;
  id: string;
  name: string;
  price: number;
  stocks: number;
  tags?: string[];
  ratings?: number;
}
