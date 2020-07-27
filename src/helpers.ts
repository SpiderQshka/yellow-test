import { JogItemFromAPI } from "api";
import { JogItem } from "types";

export const parceDate = (date?: Date) => {
  return new Date(date ? date : Date.now()).toISOString().slice(0, 10);
};

export const isDateInRange = (
  date: Date,
  from: Date | null,
  to: Date | null
) => {
  return (
    (!from && !to) ||
    (from && to && date >= from && date <= to) ||
    (!from && date <= (to as Date)) ||
    (!to && date >= (from as Date))
  );
};

export const formatJogs = (arr: JogItemFromAPI[]): JogItem[] =>
  arr.map(({ date, distance, time }) => {
    return {
      date: new Date(date),
      distance,
      speed: +(distance / time).toFixed(2),
      time,
    };
  });

export const getToken = (): string | null =>
  window.localStorage.getItem("token") || null;

export const setToken = (token: string) =>
  window.localStorage.setItem("token", token);
