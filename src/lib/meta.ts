import { createHash } from 'crypto';

const pixelId = process.env.META_PIXEL_ID!;
const accessToken = process.env.META_ACCESS_TOKEN!;

if (!pixelId || !accessToken) {
  throw new Error('META_PIXEL_ID or META_ACCESS_TOKEN is not set');
}

// Add email hashing utility function
export function hashEmail(email: string): string {
  // Normalize email according to Meta's requirements
  const normalized = email.trim().toLowerCase();
  // Create SHA-256 hash and return as hex string
  return createHash('sha256').update(normalized).digest('hex');
}

interface MetaEventData {
  event_name: 'StartTrial' | 'ViewContent';
  user_data: {
    em: string[];
  };
}

interface MetaApiResponse {
  data?: any;
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

export async function sendMetaEvent({ eventData }: { eventData: MetaEventData }): Promise<MetaApiResponse> {
  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        access_token: accessToken,
        data: JSON.stringify([
          {
            action_source: 'website',
            event_time: Math.floor(Date.now() / 1000).toString(),
            event_id: crypto.randomUUID(),
            ...eventData,
            user_data: {
              em: eventData.user_data.em.map(hashEmail),
            },
          },
        ]),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending Meta event:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        type: 'API_ERROR',
        code: 500,
      },
    };
  }
}
