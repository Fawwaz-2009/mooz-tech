export type Difficulty = 'easy' | 'intermediate' | 'difficult';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  previewCode: string;
  starterCode: {
    html: string;
    css: string;
  };
  solution: {
    html: string;
    css: string;
  };
  hints: string[];
}

export const challenges: Challenge[] = [
  {
    id: 'spoiler-reveal',
    title: 'Spoiler Reveal',
    description:
      'Create a spoiler text that reveals its content when hovered. This is a common pattern used in forums and social media platforms to hide potential spoilers.',
    difficulty: 'easy',
    tags: ['hover', 'opacity', 'transition', 'group'],
    previewCode: `
      <div class="group relative w-48 cursor-pointer">
        <div class="bg-white/80 p-4 text-center">
          <span class="text-lg">Hover me to reveal</span>
        </div>
        <div class="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 transition-opacity group-hover:opacity-100">
          <span class="text-lg text-white">Spoiler revealed!</span>
        </div>
      </div>
    `,
    starterCode: {
      html: `
<div class="...">
  <div class="...">
    <span>Hover me to reveal</span>
  </div>
  <div class="...">
    <span>Spoiler revealed!</span>
  </div>
</div>
      `,
      css: '/* No additional CSS needed, we will use Tailwind classes */',
    },
    solution: {
      html: `
<div class="group relative w-48 cursor-pointer">
  <div class="bg-white/80 p-4 text-center">
    <span class="text-lg">Hover me to reveal</span>
  </div>
  <div class="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 transition-opacity group-hover:opacity-100">
    <span class="text-lg text-white">Spoiler revealed!</span>
  </div>
</div>
      `,
      css: '/* No additional CSS needed, we will use Tailwind classes */',
    },
    hints: [
      'Use the group class on the parent element to create a hover context',
      'Use absolute positioning to overlay the spoiler content',
      'Combine opacity-0 and group-hover:opacity-100 for the reveal effect',
      'Add transition-opacity for smooth animation',
    ],
  },
];
