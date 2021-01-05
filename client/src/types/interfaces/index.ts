export interface User {
  token: string;
  name: string;
  email: string;
  _id: string;
}

export interface ITodo {
  name: string;
  description: string;
  status: boolean;
  _id: string;
}
