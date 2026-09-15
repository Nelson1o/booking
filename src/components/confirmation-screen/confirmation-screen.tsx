"use client";

import { CheckIcon } from "@/shared/icons";
import { formatDate } from "@/shared/lib";
import type { Booking } from "@/shared/types";

import styles from "./styles.module.scss";

type ConfirmationScreenProps = {
  booking: Booking;
  onReset: () => void;
};

export function ConfirmationScreen({
  booking,
  onReset,
}: ConfirmationScreenProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <CheckIcon />
      </div>

      <h2 className={styles.title}>Столик забронирован</h2>
      <p className={styles.subtitle}>Мы ждём вас! Детали брони — ниже.</p>

      <dl className={styles.details}>
        <div className={styles.row}>
          <dt className={styles.term}>Имя</dt>
          <dd className={styles.value}>{booking.name}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.term}>Телефон</dt>
          <dd className={styles.value}>{booking.phone}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.term}>Дата</dt>
          <dd className={styles.value}>{formatDate(booking.date)}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.term}>Время</dt>
          <dd className={styles.value}>{booking.time}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.term}>Гости</dt>
          <dd className={styles.value}>{booking.guests}</dd>
        </div>
      </dl>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        Забронировать ещё
      </button>
    </div>
  );
}
