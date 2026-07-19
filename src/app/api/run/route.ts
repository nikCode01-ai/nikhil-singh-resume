import { NextRequest } from 'next/server';
import { spawn } from 'child_process';

const ALLOWED_COMMANDS: Record<string, string> = {
  build: 'npm run build',
  lint: 'npm run lint',
  typecheck: 'npx tsc --noEmit',
  format: 'npm run format',
  'verify-doc':
    'python -X utf8 -c "import docx; doc=docx.Document(\'docs/कार्यकारी सारांश.docx\'); [print(p.text) for p in doc.paragraphs]"',
  'list-docs': 'dir /b docs',
  'check-build': 'npm run build 2>&1 | head -20',
};

const COMMAND_TIMEOUT_MS = 120_000;

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const cmd = req.nextUrl.searchParams.get('cmd');

  if (!cmd || !ALLOWED_COMMANDS[cmd]) {
    return new Response(
      JSON.stringify({
        error: 'Invalid command',
        allowed: Object.keys(ALLOWED_COMMANDS),
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: string) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${data}\n\n`)
        );
      };

      const child = spawn(ALLOWED_COMMANDS[cmd], {
        shell: true,
        cwd: process.cwd(),
        env: { ...process.env, FORCE_COLOR: '0' },
      });

      const timeout = setTimeout(() => {
        child.kill('SIGTERM');
        send('error', 'Command timed out');
        controller.close();
      }, COMMAND_TIMEOUT_MS);

      send('start', JSON.stringify({ cmd, command: ALLOWED_COMMANDS[cmd] }));

      child.stdout?.on('data', (chunk: Buffer) => {
        send('stdout', chunk.toString());
      });

      child.stderr?.on('data', (chunk: Buffer) => {
        send('stderr', chunk.toString());
      });

      child.on('close', (code) => {
        clearTimeout(timeout);
        send('done', JSON.stringify({ code, success: code === 0 }));
        controller.close();
      });

      child.on('error', (err) => {
        clearTimeout(timeout);
        send('error', err.message);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
