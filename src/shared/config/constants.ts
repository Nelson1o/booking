import { formatGuests } from "../lib";

export const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => `${12 + i}:00`);

export const GUEST_AMOUNT = Array.from({ length: 12 }, (_, i) => {
  const value = String(i + 1);
  return { value, label: formatGuests(i + 1) };
});
