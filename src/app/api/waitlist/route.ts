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

const getQuerySchema = z.object({
  projectName: z.string().min(1),
});

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://pages.mooz.tech',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

export async function POST(request: Request) {
  console.log('POST /api/waitlist - Starting request processing');
  try {
    const body = await request.json();
    console.log('Request body:', { ...body, email: body.email?.slice(0,3) + '***' }); // Log sanitized email
    
    const { email, projectName } = waitlistSchema.parse(body);
    console.log('Input validation passed');
    
    const project = await db.query.projects.findFirst({
      where: eq(projects.name, projectName),
    });
    console.log('Project query result:', { found: !!project, projectName });
    
    if (!project) {
      console.log('Project not found:', projectName);
      return new NextResponse(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
      });
    }

    const existingEntry = await db.query.waitlist.findFirst({
      where: eq(waitlist.email, email),
    });
    console.log('Existing entry check:', { exists: !!existingEntry });
    
    if (existingEntry) {
      return new NextResponse(
        JSON.stringify({ error: 'Email already in waitlist' }),
        {
          status: 409,
          headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
        }
      );
    }

    const totalSignups = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlist)
      .where(eq(waitlist.projectId, project.id))
      .then((res) => Number(res[0].count));
    console.log('Current total signups:', totalSignups);

    let discountPercentage = 0;
    for (const tier of discountTiers) {
      if (totalSignups < tier.maxSpots) {
        discountPercentage = tier.discount;
        break;
      }
    }
    console.log('Calculated discount:', { discountPercentage, position: totalSignups + 1 });

    console.log('Inserting into waitlist...');
    await db.insert(waitlist).values({
      email,
      projectId: project.id,
      discountPercentage,
    });
    console.log('Successfully inserted into waitlist');

    console.log('Sending welcome email...');
    await resend.emails.send({
      from: 'Fadi <hello@mooz.tech>',
      to: email,
      subject: `Welcome to Fadi's Waitlist - ${discountPercentage}% Off`,
      react: WaitlistWelcomeEmail({
        position: totalSignups + 1,
        discountPercentage,
      }),
    });
    console.log('Welcome email sent successfully');

    return new NextResponse(
      JSON.stringify({
        success: true,
        position: totalSignups + 1,
        discountPercentage,
      }),
      {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
      }
    );
  } catch (error: any) {
    console.error('Error in POST /api/waitlist:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    
    if (error instanceof z.ZodError) {
      console.log('Validation error:', error.errors);
      return new NextResponse(
        JSON.stringify({ error: 'Invalid input', details: error.errors }),
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
        }
      );
    }
    
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      }),
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = getQuerySchema.parse({
      projectName: searchParams.get('projectName'),
    });
    const project = await db.query.projects.findFirst({
      where: eq(projects.name, query.projectName),
    });
    if (!project) {
      return new NextResponse(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
      });
    }
    const totalSignups = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlist)
      .where(eq(waitlist.projectId, project.id))
      .then((res) => Number(res[0].count));

    let currentTier = discountTiers[discountTiers.length - 1];
    let spotsLeft = 0;
    for (const tier of discountTiers) {
      if (totalSignups < tier.maxSpots) {
        currentTier = tier;
        spotsLeft = tier.maxSpots - totalSignups;
        break;
      }
    }
    return new NextResponse(
      JSON.stringify({
        currentDiscount: currentTier.discount,
        spotsLeft,
        totalSignups,
      }),
      {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid input', details: error.errors }),
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
        }
      );
    }
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': 'https://pages.mooz.tech' },
      }
    );
  }
}
