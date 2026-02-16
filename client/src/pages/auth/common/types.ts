export type SignUpType = {
  email: string;
  userName: string;
  password: string;
  contactNumber: string;
  about: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type AuthUser = {
  name: string;
  email: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: any;
};
