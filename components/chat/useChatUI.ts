"use client";

import { useContext } from "react";
import { ChatUIContext } from "@/components/chat/ChatUIProvider";

export function useChatUI() {
  const context = useContext(ChatUIContext);
  if (!context) {
    throw new Error("useChatUI must be used within a ChatUIProvider");
  }
  return context;
}
