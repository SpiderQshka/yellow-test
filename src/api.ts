import { FormattedJogItem } from "types";
import { formatJogs } from "helpers";

export const UUID = "hello";
export const BASEURL = "https://jogtracker.herokuapp.com/api/v1/";

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

export const getJogs = async (token: string): Promise<FormattedJogItem[]> => {
  return await fetch(`${BASEURL}data/sync?access_token=${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((obj) => (obj.response.jogs ? obj.response.jogs : []))
    .then((jogs) => formatJogs(jogs));
};

export const postJog = async (
  token: string,
  date: string,
  time: number,
  distance: number
): Promise<FormattedJogItem> => {
  return await fetch(`${BASEURL}data/jog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: `date=${date}&time=${time}&distance=${distance}`,
  })
    .then((response) => response.json())
    .then((obj) => obj.response)
    .then((jog) => formatJogs([jog])[0]);
};

export const putJog = async (
  token: string,
  jog: FormattedJogItem
): Promise<FormattedJogItem> => {
  return await fetch(`${BASEURL}data/jog`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: `date=${jog.date}&time=${jog.time}&distance=${jog.distance}&jog_id=${jog.id}&user_id=${jog.user_id}`,
  })
    .then((response) => response.json())
    .then((obj) => obj.response)
    .then((jog) => formatJogs([jog])[0]);
};
