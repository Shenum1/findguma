"use client";

import { createContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import { MusicPlayer } from "@/components/player/MusicPlayer";

export interface PlayerTrack {
  id: string;
  title: string;
  releaseTitle: string;
  previewAudioUrl: string;
}

type PlayerStatus = "idle" | "playing" | "paused";

interface PlayerState {
  currentTrack: PlayerTrack | null;
  status: PlayerStatus;
  currentTime: number;
  duration: number;
  isVisible: boolean;
  seekToken: number;
}

type PlayerAction =
  | { type: "PLAY_TRACK"; track: PlayerTrack }
  | { type: "TOGGLE" }
  | { type: "PAUSE" }
  | { type: "SEEK"; time: number }
  | { type: "TIME_UPDATE"; time: number; duration: number }
  | { type: "CLOSE" };

const initialState: PlayerState = {
  currentTrack: null,
  status: "idle",
  currentTime: 0,
  duration: 0,
  isVisible: false,
  seekToken: 0,
};

function reducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "PLAY_TRACK":
      return {
        ...state,
        currentTrack: action.track,
        status: "playing",
        currentTime: 0,
        isVisible: true,
        seekToken: state.seekToken + 1,
      };
    case "TOGGLE":
      if (!state.currentTrack) return state;
      return { ...state, status: state.status === "playing" ? "paused" : "playing" };
    case "PAUSE":
      return { ...state, status: "paused" };
    case "SEEK":
      return { ...state, currentTime: action.time, seekToken: state.seekToken + 1 };
    case "TIME_UPDATE":
      return { ...state, currentTime: action.time, duration: action.duration };
    case "CLOSE":
      return { ...initialState };
    default:
      return state;
  }
}

export interface PlayerContextValue extends PlayerState {
  playTrack: (track: PlayerTrack) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  close: () => void;
  dispatchTimeUpdate: (time: number, duration: number) => void;
  dispatchPause: () => void;
}

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const playTrack = useCallback((track: PlayerTrack) => dispatch({ type: "PLAY_TRACK", track }), []);
  const togglePlay = useCallback(() => dispatch({ type: "TOGGLE" }), []);
  const seek = useCallback((time: number) => dispatch({ type: "SEEK", time }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const dispatchTimeUpdate = useCallback(
    (time: number, duration: number) => dispatch({ type: "TIME_UPDATE", time, duration }),
    []
  );
  const dispatchPause = useCallback(() => dispatch({ type: "PAUSE" }), []);

  const value = useMemo<PlayerContextValue>(
    () => ({ ...state, playTrack, togglePlay, seek, close, dispatchTimeUpdate, dispatchPause }),
    [state, playTrack, togglePlay, seek, close, dispatchTimeUpdate, dispatchPause]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <MusicPlayer />
    </PlayerContext.Provider>
  );
}
