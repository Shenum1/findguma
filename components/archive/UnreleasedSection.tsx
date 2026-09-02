"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { PixelButton, pixelButtonClass } from "@/components/ui/PixelButton";
import { PixelLoader } from "@/components/ui/PixelLoader";
import { usePlayer } from "@/components/player/usePlayer";
import { useCommunityAuth } from "@/components/community/useCommunityAuth";
import type { UnreleasedItemSummary } from "@/lib/content/unreleased";

/**
 * The gated Archive section. Unauthenticated visitors never receive item
 * metadata (the fetch to /api/archive/unreleased 401s before any Supabase
 * query runs), and a signed URL for the actual media is only minted
 * server-side, per item, on demand — see app/api/archive/unreleased/**.
 */
export function UnreleasedSection() {
  const { status } = useCommunityAuth();
  const { playTrack, currentTrack, status: playerStatus, togglePlay } = usePlayer();

  const [items, setItems] = useState<UnreleasedItemSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authed") return;
    let cancelled = false;
    setLoading(true);
    fetch("/api/archive/unreleased")
      .then((response) => (response.ok ? response.json() : { ok: false, items: [] }))
      .then((data) => {
        if (!cancelled) setItems(data.items ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [status]);

  async function handlePlay(item: UnreleasedItemSummary) {
    setActiveSlug(item.slug);
    setVideoUrl(null);
    const response = await fetch(`/api/archive/unreleased/${item.slug}/signed-url`).catch(() => null);
    const data = await response?.json().catch(() => null);
    if (!data?.ok) {
      setActiveSlug(null);
      return;
    }
    if (item.kind === "audio") {
      playTrack({ id: item.id, title: item.title, releaseTitle: "UNRELEASED", previewAudioUrl: data.url });
    } else {
      setVideoUrl(data.url);
    }
  }

  if (status === "loading") {
    return <PixelLoader label="LOADING" />;
  }

  if (status === "anon") {
    return (
      <EmptyState
        title="PRIVATE ARCHIVE"
        description="Some things aren't ready for everyone yet. Sign in or create an account to see what's back here."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/sign-up" className={pixelButtonClass("primary")}>
              CREATE ACCOUNT
            </Link>
            <Link href="/sign-in" className={pixelButtonClass("ghost")}>
              LOG IN
            </Link>
          </div>
        }
      />
    );
  }

  if (status === "authed-no-username") {
    return <EmptyState title="ALMOST THERE" description="Choose a username to unlock the private archive." />;
  }

  if (loading || items === null) {
    return <PixelLoader label="LOADING ARCHIVE" />;
  }

  if (items.length === 0) {
    return <EmptyState title="NOTHING HERE YET" description="Check back soon." />;
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isCurrentAudio = item.kind === "audio" && currentTrack?.id === item.id;
        const isPlaying = isCurrentAudio && playerStatus === "playing";

        return (
          <div
            key={item.slug}
            className="pixel-corners border border-ink/40 bg-canvas-raised p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-pixel text-base uppercase tracking-wide text-ink">{item.title}</p>
                {item.description ? (
                  <p className="mt-1 font-body text-sm text-muted">{item.description}</p>
                ) : null}
              </div>
              <PixelButton
                type="button"
                variant="ghost"
                onClick={() => (isCurrentAudio ? togglePlay() : handlePlay(item))}
              >
                {item.kind === "video"
                  ? "WATCH"
                  : isPlaying
                    ? "❚❚ PAUSE"
                    : "▶ PLAY"}
              </PixelButton>
            </div>
            {activeSlug === item.slug && item.kind === "video" && videoUrl ? (
              <video controls src={videoUrl} className="mt-3 w-full" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
