import type { Booking, FormErrors } from "@/shared/types";

export const validate = (data: Booking): FormErrors => {
  const errors: FormErrors = {};

  const name = data.name.trim();
  if (!name) {
    errors.name = "Введите имя";
  } else if (name.length < 2) {
    errors.name = "Имя должно содержать минимум 2 символа";
  }

  const phone = data.phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Введите телефон";
  } else if (phone.length !== 11 || !["7", "8"].includes(phone[0])) {
    errors.phone = "Формат: +7XXXXXXXXXX или 8XXXXXXXXXX";
  }

  if (!data.date) {
    errors.date = "Выберите дату";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(data.date).getTime() < today.getTime()) {
      errors.date = "Дата не может быть в прошлом";
    }
  }

  if (!data.time) errors.time = "Выберите время";
  if (!data.guests) errors.guests = "Укажите количество гостей";

  return errors;
};
