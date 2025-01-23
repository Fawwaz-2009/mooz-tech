import { Resend } from 'resend';
import { WaitlistWelcomeEmail } from '@/emails/waitlist-welcome';
import { db } from '@/db';
import { projects, waitlist } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Define discount tiers more explicitly with total spots
const discountTiers = [
  { discount: 70, maxSpots: 5 },
  { discount: 60, maxSpots: 10 },
  { discount: 50, maxSpots: 45 },
  { discount: 40, maxSpots: 100 },
  { discount: 30, maxSpots: 200 },
  { discount: 20, maxSpots: 500 },
] as const;

// Input validation schema
const waitlistSchema = z.object({
  email: z.string().email(),
  projectName: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    // Parse and validate input
    const body = await request.json();
    const { email, projectName } = waitlistSchema.parse(body);

    // Check if project exists
    const project = await db.query.projects.findFirst({
      where: eq(projects.name, projectName),
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check if email is already in waitlist
    const existingEntry = await db.query.waitlist.findFirst({
      where: eq(waitlist.email, email),
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already in waitlist' },
        { status: 409 }
      );
    }

    // Count total signups for this project to determine position and discount
    const totalSignups = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlist)
      .where(eq(waitlist.projectId, project.id))
      .then((res) => Number(res[0].count));

    // Calculate discount based on position
    let discountPercentage = 0;
    for (const tier of discountTiers) {
      if (totalSignups < tier.maxSpots) {
        discountPercentage = tier.discount;
        break;
      }
    }

    // Add to waitlist
    await db.insert(waitlist).values({
      email,
      projectId: project.id,
      discountPercentage,
    });

    // Send welcome email
    await resend.emails.send({
      from: 'Fadi <hello@mooz.tech>',
      to: email,
      subject: `Welcome to Fadi's Waitlist - ${discountPercentage}% Off`,
      react: WaitlistWelcomeEmail({
        position: totalSignups + 1,
        discountPercentage,
      }),
    });

    return NextResponse.json({
      success: true,
      position: totalSignups + 1,
      discountPercentage,
    });
  } catch (error) {
    console.error('Waitlist error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ... existing imports ...

const getQuerySchema = z.object({
  projectName: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = getQuerySchema.parse({
      projectName: searchParams.get('projectName'),
    });

    // Check if project exists
    const project = await db.query.projects.findFirst({
      where: eq(projects.name, query.projectName),
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Get total signups for this project
    const totalSignups = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlist)
      .where(eq(waitlist.projectId, project.id))
      .then((res) => Number(res[0].count));

    // For spots query, calculate current discount tier and spots left
    let currentTier = discountTiers[discountTiers.length - 1]; // Default to last tier
    let spotsLeft = 0;

    for (const tier of discountTiers) {
      if (totalSignups < tier.maxSpots) {
        currentTier = tier;
        spotsLeft = tier.maxSpots - totalSignups;
        break;
      }
    }

    return NextResponse.json({
      currentDiscount: currentTier.discount,
      spotsLeft,
      totalSignups,
    });
  } catch (error) {
    console.error('Waitlist query error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
