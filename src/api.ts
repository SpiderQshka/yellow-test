import { JogItem } from "types";

export const UUID = "hello";
export const BASEURL = "https://jogtracker.herokuapp.com/api/v1/";

export interface JogItemFromAPI {
  date: number;
  distance: number;
  id: number;
  time: number;
  user_id: number;
}

export const logIn = async (): Promise<string> => {
  return await fetch(`${BASEURL}auth/uuidLogin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `uuid=${UUID}`,
  })
    .then((response) => response.json())
    .then((obj) => obj.response.access_token);
};

export const getCurrentUser = async (token: string): Promise<any> => {
  return await fetch(`${BASEURL}auth/user?access_token=${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getJogs = async (token: string): Promise<JogItemFromAPI[]> => {
  return await fetch(`${BASEURL}data/sync?access_token=${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((obj) => (obj.response.jogs ? obj.response.jogs : []));
};
