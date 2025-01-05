'use client';

import { Button } from '@/components/ui/button';
import { ThumbsUp, Heart, Trophy, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { incrementCounter } from '@/app/writings/[slug]/actions';

interface WritingInteractionsProps {
  slug: string;
  title: string;
  initialCounts: {
    likes: number;
    loves: number;
    awards: number;
  };
}

// Type for storing interactions in localStorage
type StoredInteractions = {
  [slug: string]: {
    likes?: boolean;
    loves?: boolean;
    awards?: boolean;
  };
};

const STORAGE_KEY = 'writing-interactions';

function getStoredInteractions(): StoredInteractions {
  if (typeof window === 'undefined') return {};
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function storeInteraction(slug: string, type: 'likes' | 'loves' | 'awards') {
  const interactions = getStoredInteractions();
  interactions[slug] = {
    ...interactions[slug],
    [type]: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(interactions));
}

export function WritingInteractions({ slug, title, initialCounts }: WritingInteractionsProps) {
  const [counts, setCounts] = useState(initialCounts);
  const [clicked, setClicked] = useState<Record<string, boolean>>({});

  // Load stored interactions on mount
  useEffect(() => {
    const interactions = getStoredInteractions();
    const userInteractions = interactions[slug] || {};
    setClicked(userInteractions);
  }, [slug]);

  const handleInteraction = async (type: 'likes' | 'loves' | 'awards') => {
    if (clicked[type]) return;
    
    try {
      await incrementCounter(slug, type);
      setClicked(prev => ({ ...prev, [type]: true }));
      setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
      storeInteraction(slug, type);
    } catch (error) {
      console.error('Failed to increment counter:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-b py-4 my-8">
      <Button
        variant="default"
        size="lg"
        onClick={handleShare}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 gap-2"
      >
        <Share2 className="h-5 w-5" />
        <span>Share</span>
      </Button>

      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => handleInteraction('likes')}
          disabled={clicked.likes}
          className="flex gap-2 rounded-full hover:bg-gray-100"
        >
          <ThumbsUp className={`h-5 w-5 ${clicked.likes ? 'fill-current' : ''}`} />
          <span>{counts.likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => handleInteraction('loves')}
          disabled={clicked.loves}
          className="flex gap-2 rounded-full hover:bg-gray-100"
        >
          <Heart className={`h-5 w-5 ${clicked.loves ? 'fill-current text-red-500' : ''}`} />
          <span>{counts.loves}</span>
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => handleInteraction('awards')}
          disabled={clicked.awards}
          className="flex gap-2 rounded-full hover:bg-gray-100"
        >
          <Trophy className={`h-5 w-5 ${clicked.awards ? 'fill-current text-yellow-500' : ''}`} />
          <span>{counts.awards}</span>
        </Button>
      </div>
    </div>
  );
} 