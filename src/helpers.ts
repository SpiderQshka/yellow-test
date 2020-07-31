import { JogItemFromAPI, FormattedJogItem } from "types";
import { useEffect, useRef } from "react";

export const parceDate = (date?: Date) =>
  new Date(date ? date : Date.now()).toISOString().slice(0, 10);

export const isDateInRange = (date: Date, from: Date | null, to: Date | null) =>
  (!from && !to) ||
  (from && to && date >= from && date <= to) ||
  (!from && date <= (to as Date)) ||
  (!to && date >= (from as Date));

export const formatJogs = (arr: JogItemFromAPI[]): FormattedJogItem[] =>
  arr.map(({ date, distance, time, id, user_id }) => {
    return {
      date: typeof date === "string" ? date : new Date(date * 1000),
      distance,
      speed: +(distance / time).toFixed(2),
      time,
      id,
      user_id,
    };
  });

export const getTokenFromLocalStorage = (): string | null =>
  window.localStorage.getItem("token") || null;

export const setTokenToLocalStorage = (token: string) =>
  window.localStorage.setItem("token", token);

export const findJogIndex = (jogs: FormattedJogItem[], jogId: number) => {
  let updatedJogIndex: number = 0;
  jogs.forEach((jog, i) => {
    if (jog.id === jogId) updatedJogIndex = i;
  });

  return updatedJogIndex;
};

export const useTraceUpdate = (props: any) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
};
