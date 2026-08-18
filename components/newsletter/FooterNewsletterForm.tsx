"use client";

import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { useNewsletter } from "@/components/newsletter/useNewsletter";

export function FooterNewsletterForm() {
  const { markSubscribed } = useNewsletter();
  return <NewsletterForm idPrefix="newsletter-footer" onSuccess={markSubscribed} />;
}
