"use client";

import { useEffect, useRef } from "react";

type EscapeHandler = () => void;

// Module-level stack shared by every Modal/Panel in the app. Only the
// most-recently-activated layer receives Escape, so a nested modal (e.g. the
// archive lightbox) closes on its own before the panel behind it ever sees
// the key — independent per-component `document` keydown listeners can't
// coordinate that on their own.
const stack: EscapeHandler[] = [];
let listenerAttached = false;

function ensureListener() {
  if (listenerAttached) return;
  listenerAttached = true;
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const top = stack[stack.length - 1];
    if (!top) return;
    event.preventDefault();
    top();
  });
}

export function useEscapeStack(active: boolean, onEscape: () => void) {
  const handlerRef = useRef(onEscape);
  handlerRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    ensureListener();
    const wrapped = () => handlerRef.current();
    stack.push(wrapped);
    return () => {
      const index = stack.lastIndexOf(wrapped);
      if (index !== -1) stack.splice(index, 1);
    };
  }, [active]);
}
