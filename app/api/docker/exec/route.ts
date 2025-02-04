import { NextApiRequest } from 'next';
import { Server } from 'socket.io';
import { spawn } from 'child_process';

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/docker/exec',
      addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
      const shell = spawn('docker', ['exec', '-it', 'bolt-ai', '/bin/bash']);

      shell.stdout.on('data', (data) => {
        socket.emit('output', data.toString());
      });

      shell.stderr.on('data', (data) => {
        socket.emit('output', data.toString());
      });

      socket.on('input', (data) => {
        shell.stdin.write(data);
      });

      socket.on('disconnect', () => {
        shell.kill();
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export const GET = ioHandler;
export const POST = ioHandler;
