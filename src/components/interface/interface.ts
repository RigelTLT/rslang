export interface IapiRequestWords {
  group: string;
  page: string;
}
export interface IapiRequestUserWords {
  group: string;
  status: string;
}
export interface Isignin {
  email: string;
  password: string;
}
export interface Iregist {
  name: string;
  email: string;
  password: string;
}
export interface IidToken {
  id: string;
  token: string;
  name: string;
}
export interface Iauth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
export interface IuserWords {
  difficulty: string;
  optional: {};
}
