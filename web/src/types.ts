export type User = {
  id: number;
  email: string;
  username: string;
};

export type Room = {
  id: number;
  name: string;
};

export type UserRoom = {
  id: number;
  user_id: number;
  room_id: number;
  role: 'admin' | 'member';
};

export type VerifyOTPResult = {
  access_token: string;
  refresh_token: string;
};
