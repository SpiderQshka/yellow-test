import { createContext, useContext } from "react";

export interface IContext {
  token: string | null;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<IContext>({} as IContext);

export function useAuth() {
  return useContext(AuthContext);
}
