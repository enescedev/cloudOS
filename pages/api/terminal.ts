import type { NextApiRequest } from 'next';
import { WebSocket, Server } from 'ws';
import { spawn } from 'node-pty';

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.ws) {
    const wss = new Server({ noServer: true });
    
    res.socket.server.ws = wss;

    res.socket.server.on('upgrade', (request: any, socket: any, head: any) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    wss.on('connection', (ws: WebSocket) => {
      const pty = spawn('/bin/bash', [], {
        name: 'xterm-256color',
        cols: 80,
        rows: 24,
        cwd: '/root/workspace',
        env: process.env as { [key: string]: string }
      });

      pty.onData((data) => {
        ws.send(data);
      });

      ws.on('message', (data: Buffer) => {
        try {
          const message = JSON.parse(data.toString());
          if (message.type === 'resize') {
            pty.resize(message.cols, message.rows);
          } else {
            pty.write(data.toString());
          }
        } catch {
          pty.write(data.toString());
        }
      });

      ws.on('close', () => {
        pty.kill();
      });
    });
  }

  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
