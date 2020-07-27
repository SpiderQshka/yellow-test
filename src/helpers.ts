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
