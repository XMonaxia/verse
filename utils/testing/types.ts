export interface AllResponse {
  data: ArticleResponse[];
  total: 0;
  page: 0;
  limit: 0;
}
export interface AllCategoryResponse {
  data: CategoryResponse[];
  totalData: 0;
  currentPage: 0;
  totalPages: 0;
}
export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  user: {
    id: string;
    username: string;
    role: "User" | "Admin";
  };
}
export interface CategoryResponse {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserResponse {
  id: string;
  username: string;
  role: "User" | "Admin";
}
