"use client";

import { useState } from "react";

import { BookingForm } from "@/components/booking-form";
import { ConfirmationScreen } from "@/components/confirmation-screen";
import type { Booking, Screen } from "@/shared/types";

import styles from "./styles.module.scss";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("idle");
  const [booking, setBooking] = useState<Booking | null>(null);

  const handleSuccess = (data: Booking) => {
    setBooking(data);
    setScreen("confirmation");
  };

  const handleNewBooking = () => {
    setBooking(null);
    setScreen("form");
  };

  return (
    <main className={styles.page}>
      {screen === "idle" && (
        <>
          <h1 className={styles.title}>Бронирование столика</h1>
          <button
            type="button"
            className={styles.bookButton}
            onClick={() => setScreen("form")}
          >
            Забронировать
          </button>
        </>
      )}

      {screen === "form" && (
        <BookingForm
          onCancel={() => setScreen("idle")}
          onSuccess={handleSuccess}
        />
      )}

      {screen === "confirmation" && booking && (
        <ConfirmationScreen booking={booking} onReset={handleNewBooking} />
      )}
    </main>
  );
}
