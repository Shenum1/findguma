"use client";

import { useContext } from "react";
import { NewsletterContext } from "@/components/newsletter/NewsletterProvider";

export function useNewsletter() {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error("useNewsletter must be used within a NewsletterProvider");
  }
  return context;
}
