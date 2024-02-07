export type User = {
  name: string;
  cpf: string;
  type: 'ADMIN' | 'USER';
};

export type UserEdited = {
  name: string;
  type: 'ADMIN' | 'USER';
};

export type AllUsers = {
  id: string;
  name: string;
  cpf: string;
  type: 'ADMIN' | 'USER';
};

export type CreateUser = {
  name: string;
  cpf: string;
  type: 'ADMIN' | 'USER';
  password: string;
};

export type RegisterUser = {
  name: string;
  cpf: string;
  password: string;
};

export type UpdatePasswordUser = {
  userId: string;
  lastPassword: string;
  newPassword: string;
};

export type UserType = { value: string; description: string };
