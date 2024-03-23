export type UserData = {
  id: string;
  email: string;
  fullname: string;
};

export type RegisterData = {
  email: string;
  fullname: string;
  password: string;
  password_confirmation: string;
};

export type ProjectCreateData = {
  name: string;
  description: string;
};

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  owner: UserData;
};
