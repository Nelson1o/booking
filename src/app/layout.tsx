import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

import "@/shared/styles/globals.scss";

export const metadata: Metadata = {
  title: "Бронирование столика",
  description: "Онлайн-бронирование столика в ресторане",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
