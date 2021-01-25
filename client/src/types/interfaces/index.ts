export interface User {
  token: string;
  name: string;
  email: string;
}

export interface Todo {
  name: string;
  description: string;
  status: boolean;
  _id: string;
}
