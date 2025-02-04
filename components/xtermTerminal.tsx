'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { io, Socket } from 'socket.io-client';
import 'xterm/css/xterm.css';

interface XtermTerminalProps {
  config: {
    host: string;
    username: string;
    password: string;
  };
}

const XtermTerminal: React.FC<XtermTerminalProps> = ({ config }) => {
  const terminalRef = useRef(null);
  const xterm = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      try {
        xterm.current = new Terminal({
          theme: {
            background: '#000000',
            foreground: '#ffffff'
          },
          cursorBlink: true,
          fontSize: 14,
          fontFamily: 'Courier New'
        });

        xterm.current.loadAddon(fitAddon.current);
        xterm.current.open(terminalRef.current);
        
        // Terminal başlatma gecikmesini önlemek için timeout kullan
        setTimeout(() => {
          fitAddon.current.fit();
        }, 0);

        xterm.current.writeln('Connecting to SSH server...');

        // Socket.io bağlantısını yapılandır
        socket.current = io(process.env.NEXT_PUBLIC_WEBSSH2_URL || 'http://localhost:2222', {
          path: '/ssh/socket.io',
          transports: ['websocket'],
          upgrade: false,
          query: {
            ...config,
            port: 22,
          },
        });

        socket.current.on('connect', () => {
          xterm.current?.writeln('Connected to SSH server.');
        });

        socket.current.on('data', (data: string) => {
          xterm.current?.write(data);
        });

        xterm.current.onData((data) => {
          socket.current?.emit('data', data);
        });

        socket.current.on('disconnect', () => {
          xterm.current?.writeln('Disconnected from SSH server.');
        });

        socket.current.on('error', (error: Error) => {
          xterm.current?.writeln(`Error: ${error.message}`);
        });

        const handleResize = () => {
          setTimeout(() => {
            fitAddon.current.fit();
          }, 0);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          xterm.current?.dispose();
          socket.current?.disconnect();
        };
      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    }
  }, [config]);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default XtermTerminal;
