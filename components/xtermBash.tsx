'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Terminal as TerminalIcon } from "lucide-react";
import { io } from 'socket.io-client';
import 'xterm/css/xterm.css';

interface XtermBashProps {
  containerId?: string;
}

const XtermBash: React.FC<XtermBashProps> = ({ containerId = 'bolt-ai' }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const xterm = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());
  const [isTerminalReady, setIsTerminalReady] = useState(false);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (isTerminalReady) {
      setTimeout(() => {
        try {
          fitAddon.current.fit();
        } catch (error) {
          console.error('Error fitting terminal:', error);
        }
      }, 100);
    }
  };

  useEffect(() => {
    let mounted = true;
    let socket: any = null;

    const initTerminal = () => {
      if (!terminalRef.current || xterm.current) return;

      try {
        const term = new Terminal({
          theme: {
            background: '#1a1b1e',
            foreground: '#ffffff',
            cursor: '#ffffff',
            cursorAccent: '#000000',
          },
          cursorBlink: true,
          fontSize: 14,
          fontFamily: 'monospace',
          rows: 24,
          cols: 80,
        });

        xterm.current = term;
        term.loadAddon(fitAddon.current);

        // ResizeObserver ile terminal container'ını izle
        resizeObserver.current = new ResizeObserver(() => {
          if (isTerminalReady) {
            try {
              fitAddon.current.fit();
            } catch (error) {
              console.error('Error fitting terminal:', error);
            }
          }
        });

        resizeObserver.current.observe(terminalRef.current);

        // Terminal DOM'a ekle ve WebSocket bağlantısını başlat
        requestAnimationFrame(() => {
          if (terminalRef.current && mounted) {
            term.open(terminalRef.current);
            
            socket = io({
              path: '/api/docker/exec',
            });

            socket.on('connect', () => {
              console.log('WebSocket connected');
              setIsTerminalReady(true);
            });

            socket.on('output', (data: string) => {
              term.write(data);
            });

            term.onData((data) => {
              socket?.emit('input', data);
            });

            fitAddon.current.fit();
          }
        });

      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    initTerminal();

    return () => {
      mounted = false;
      socket?.disconnect();
      resizeObserver.current?.disconnect();
      if (xterm.current) {
        xterm.current.dispose();
      }
    };
  }, [containerId, isTerminalReady]);

  return (
    <div className={`relative rounded-lg overflow-hidden border border-border
      ${isFullscreen ? 'fixed inset-0 z-50 m-4' : 'h-[600px]'}`}>
      {isTerminalReady && (
        <>
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          <div className="absolute top-2 left-2 z-10">
            <Button variant="ghost" size="icon" className="bg-background/50">
              <TerminalIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
};

export default XtermBash;
