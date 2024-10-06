export type Note = {
  id: string;
  title: string;
  description: string;
  isPublic: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    name: string | null;
  };
};
