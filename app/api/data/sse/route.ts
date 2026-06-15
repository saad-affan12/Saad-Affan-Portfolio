import { NextRequest } from 'next/server';
import { readDataFile } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';
import { DATA_FILES, type DataKey } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendKeepAlive = () => {
        try {
          controller.enqueue(encoder.encode(': keepalive\n\n'));
        } catch {}
      };

      const sendEvent = (key: string, data: unknown) => {
        try {
          const event = `data: ${JSON.stringify({ key, data })}\n\n`;
          controller.enqueue(encoder.encode(event));
        } catch {}
      };

      const intervalId = setInterval(sendKeepAlive, 15000);

      let cleanupRealtime: (() => void) | null = null;
      let pollingInterval: ReturnType<typeof setInterval> | null = null;
      const hashes = new Map<string, string>();

      const pollData = () => {
        const keys = Object.keys(DATA_FILES) as DataKey[];
        for (const key of keys) {
          readDataFile(key).then((data) => {
            if (data === null) return;
            const hash = JSON.stringify(data);
            if (hashes.get(key) === hash) return;
            hashes.set(key, hash);
            sendEvent(key, data);
          });
        }
      };

      const sb = supabase;
      if (sb) {
        const channel = sb
          .channel('portfolio-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'portfolio_data' },
            (payload) => {
              const record = (payload.new as Record<string, unknown> | null)
                || (payload.old as Record<string, unknown> | null);
              const key = record?.key as string | undefined;
              if (key) {
                sendEvent(key, record?.data);
              }
            }
          )
          .subscribe();

        cleanupRealtime = () => {
          sb.removeChannel(channel);
        };
      } else {
        pollingInterval = setInterval(pollData, 5000);
      }

      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        if (cleanupRealtime) cleanupRealtime();
        if (pollingInterval) clearInterval(pollingInterval);
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
