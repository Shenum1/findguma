"use client";

import { useContext } from "react";
import { PlayerContext } from "@/components/player/PlayerProvider";

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
