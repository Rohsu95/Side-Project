export interface placesType {
  content: string;
  createdAt: string;
  creator: string;
  id: string;
  image: string;
  tags: string;
  title: string;
  username: string;
  __v: number;
  _id: string;
}

export interface IEditor {
  content: string;
  createdAt: string;
  creator: Date;
  id?: string;
  image: string;
  tags: string;
  title: string;
  username: string;
  __v?: number;
  _id?: string;
}

export interface IEdit {
  title: string;
  content: string;
  tags: string;
}
