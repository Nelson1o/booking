"use client";

import { ChangeEvent, FocusEvent, SubmitEventHandler, useState } from "react";

import { GUEST_AMOUNT, TIME_SLOTS } from "@/shared/config";
import { getTodayString, validate } from "@/shared/lib";
import type { Booking, FormErrors } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = {
  onCancel: () => void;
  onSuccess: (booking: Booking) => void;
};

const getInitialFormData = (): Booking => ({
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
});

export function BookingForm({ onCancel, onSuccess }: Props) {
  const [formData, setFormData] = useState<Booking>(getInitialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof Booking;

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.name as keyof Booking;
    const fieldError = validate(formData)[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    onSuccess(formData);
  };

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          placeholder="Имя"
          autoComplete="name"
        />
        <span className={styles.error}>{errors.name ?? ""}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
        />
        <span className={styles.error}>{errors.phone ?? ""}</span>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="date" className={styles.label}>
            Дата
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            min={getTodayString()}
            className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
          />
          <span className={styles.error}>{errors.date ?? ""}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="time" className={styles.label}>
            Время
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.select} ${errors.time ? styles.inputError : ""}`}
          >
            <option value="">Выберите время</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <span className={styles.error}>{errors.time ?? ""}</span>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="guests" className={styles.label}>
          Количество гостей
        </label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.select} ${errors.guests ? styles.inputError : ""}`}
        >
          <option value="">Выберите количество</option>
          {GUEST_AMOUNT.map((guest) => (
            <option key={guest.value} value={guest.value}>
              {guest.label}
            </option>
          ))}
        </select>
        <span className={styles.error}>{errors.guests ?? ""}</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Бронирую..." : "Забронировать"}
        </button>
      </div>
    </form>
  );
}
