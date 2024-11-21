export type CategoryType = {
  id: number;
  name: string;
  image: string;
  isParent: boolean;
  parentId: number | null;
  children: CategoryType[];
}
