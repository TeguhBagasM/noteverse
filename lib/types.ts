export interface Note {
  id: string;
  title: string;
  description: string;
  isPublic: "public" | "private";
  createdAt: string;
  user: {
    name: string;
  };
}
