import { Timestamp } from "firebase/firestore";

export interface IReview {
  description: string;
  picture: string;
  rating: number;
  title: string;
  userId: string;
  createdAt: Timestamp;
}
