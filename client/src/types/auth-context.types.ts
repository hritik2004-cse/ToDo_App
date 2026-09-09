import type React from "react";

export type AuthContextType = {
  user: User | null;
  userLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCurrentUser: () => Promise<void>;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type User = {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  profileImgUrl: string;
};
