import { createContext, useContext } from "react";
import { IContext } from "types";

export const AuthContext = createContext<IContext>({} as IContext);

export function useAuth() {
  return useContext(AuthContext);
}
