export type Booking = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
};

export type FormErrors = Partial<Record<keyof Booking, string>>;
