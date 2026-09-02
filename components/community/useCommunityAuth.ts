"use client";

import { useContext } from "react";
import { CommunityAuthContext } from "@/components/community/CommunityAuthProvider";

export function useCommunityAuth() {
  const context = useContext(CommunityAuthContext);
  if (!context) {
    throw new Error("useCommunityAuth must be used within a CommunityAuthProvider");
  }
  return context;
}
