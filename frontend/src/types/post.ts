export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface PostCreate {
  title: string;
  content: string;
}

export type PostUpdate = PostCreate;
