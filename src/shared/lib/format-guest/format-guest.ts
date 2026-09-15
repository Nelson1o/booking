export const formatGuests = (value: number): string => {
  const last = value % 10;
  const lastTwo = value % 100;

  if (lastTwo === 11 || lastTwo === 12) return `${value} гостей`;
  if (last === 1) return `${value} гость`;
  if (last >= 2 && last <= 4) return `${value} гостя`;

  return `${value} гостей`;
};
