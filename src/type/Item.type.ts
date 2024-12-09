import type {CategoryType} from "@/type/Category.type";

export type ItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: CategoryType[];
  files: File[];
  imageUrl?: string;
}
