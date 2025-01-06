"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, Heart, Trophy, Share2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { incrementCounter } from "@/app/writings/[slug]/actions";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";

interface WritingInteractionsProps {
  slug: string;
  title: string;
  initialCounts: {
    likes: number;
    loves: number;
    awards: number;
  };
}

type InteractionType = "likes" | "loves" | "awards";

const STORAGE_KEY = "writing-interactions";

const INTERACTION_COLORS = {
  likes: ["#60A5FA", "#2563EB"],
  loves: ["#FB7185", "#E11D48"],
  awards: ["#FCD34D", "#F59E0B"],
} as const;

const CONFETTI_CONFIG = {
  particleCount: 25,
  spread: 30,
  startVelocity: 15,
  scalar: 0.6,
  ticks: 50,
  gravity: 1.2,
  shapes: ["circle"],
  disableForReducedMotion: true,
} as const;

function getStoredInteractions(slug: string) {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};

  try {
    const data = JSON.parse(stored);
    return data[slug] || {};
  } catch {
    return {};
  }
}

function storeInteraction(slug: string, type: InteractionType) {
  const stored = localStorage.getItem(STORAGE_KEY);
  const data = stored ? JSON.parse(stored) : {};

  data[slug] = {
    ...data[slug],
    [type]: true,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function WritingInteractions({ slug, title, initialCounts }: WritingInteractionsProps) {
  const [counts, setCounts] = useState(initialCounts);
  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // Load stored interactions on mount and setup confetti cleanup
  useEffect(() => {
    const userInteractions = getStoredInteractions(slug);
    setClicked(userInteractions);

    // Cleanup confetti on unmount
    return () => {
      confetti.reset();
    };
  }, [slug]);

  const handleInteraction = useCallback(
    async (type: InteractionType, event: React.MouseEvent<HTMLButtonElement>) => {
      if (clicked[type] || loading[type]) return;

      setLoading((prev) => ({ ...prev, [type]: true }));

      try {
        await incrementCounter(slug, type);
        setClicked((prev) => ({ ...prev, [type]: true }));
        setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
        storeInteraction(slug, type);

        // Get precise click position
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;

        // Trigger confetti
        confetti({
          ...CONFETTI_CONFIG,
          origin: { x, y },
          colors: INTERACTION_COLORS[type],
        } as any);
      } catch (error) {
        console.error("Failed to increment counter:", error);
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
    },
    [slug, clicked, loading]
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-b py-4 my-8">
      <Button variant="default" size="lg" onClick={handleShare} className="bg-blue-600 hover:bg-blue-700 text-white px-8 gap-2">
        <Share2 className="h-5 w-5" />
        <span>Share</span>
      </Button>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={(e) => handleInteraction("likes", e)}
          disabled={clicked.likes || loading.likes}
          className={`flex gap-2 rounded-full transition-colors ${clicked.likes ? "border-blue-500 text-blue-500" : ""}`}
        >
          <ThumbsUp className={`h-5 w-5 ${clicked.likes ? "fill-blue-500" : ""}`} />
          {loading.likes ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>{counts.likes}</span>}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={(e) => handleInteraction("loves", e)}
          disabled={clicked.loves || loading.loves}
          className={`flex gap-2 rounded-full transition-colors ${clicked.loves ? "border-red-500 text-red-500" : ""}`}
        >
          <Heart className={`h-5 w-5 ${clicked.loves ? "fill-red-500" : ""}`} />
          {loading.loves ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>{counts.loves}</span>}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={(e) => handleInteraction("awards", e)}
          disabled={clicked.awards || loading.awards}
          className={`flex gap-2 rounded-full transition-colors ${clicked.awards ? "border-yellow-500 text-yellow-500" : ""}`}
        >
          <Trophy className={`h-5 w-5 ${clicked.awards ? "fill-yellow-500" : ""}`} />
          {loading.awards ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>{counts.awards}</span>}
        </Button>
      </div>
    </div>
  );
}
