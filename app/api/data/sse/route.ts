import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  let lastTimestamps: Record<string, number> = {};
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const stat = fs.statSync(path.join(DATA_DIR, file));
    lastTimestamps[file] = stat.mtimeMs;
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendKeepAlive = () => {
        try {
          controller.enqueue(encoder.encode(': keepalive\n\n'));
        } catch {}
      };

      const checkChanges = () => {
        try {
          for (const file of files) {
            const filePath = path.join(DATA_DIR, file);
            if (!fs.existsSync(filePath)) continue;
            const stat = fs.statSync(filePath);
            const newTime = stat.mtimeMs;
            if (newTime !== lastTimestamps[file]) {
              lastTimestamps[file] = newTime;
              const key = file.replace('.json', '');
              const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
              const event = `data: ${JSON.stringify({ key, data })}\n\n`;
              controller.enqueue(encoder.encode(event));
            }
          }
        } catch {}
      };

      const intervalId = setInterval(checkChanges, 800);
      const keepAliveId = setInterval(sendKeepAlive, 15000);

      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        clearInterval(keepAliveId);
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
