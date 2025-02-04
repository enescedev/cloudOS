'use client';

import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import 'xterm/css/xterm.css';

interface TerminalProps {
  containerId: string;
}

const Terminal = ({ containerId }: TerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<XTerm | null>(null);
  const fitAddon = useRef(new FitAddon());
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;

  const connectWebSocket = (terminal: XTerm) => {
    try {
      const wsUrl = `ws://${window.location.host}/api/terminal`;
      console.log('Attempting WebSocket connection:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);

      const sendTerminalSize = () => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const dims = fitAddon.current.proposeDimensions();
          wsRef.current.send(JSON.stringify({
            type: 'resize',
            cols: dims?.cols,
            rows: dims?.rows
          }));
        }
      };

      wsRef.current.onopen = () => {
        console.log('WebSocket connection established');
        terminal.writeln('\r\nConnection successful.');
        reconnectAttempts.current = 0;
        sendTerminalSize();
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        terminal.writeln('\r\nConnection closed.');

        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
          terminal.writeln(`\r\nRetrying connection (${reconnectAttempts.current + 1}/${maxReconnectAttempts})...`);
          
          reconnectAttempts.current++;
          setTimeout(() => connectWebSocket(terminal), delay);
        } else {
          terminal.writeln('\r\nConnection failed. Please refresh the page.');
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        terminal.writeln('\r\nConnection error occurred.');
      };

      const attachAddon = new AttachAddon(wsRef.current);
      terminal.loadAddon(attachAddon);

    } catch (error) {
      console.error('WebSocket creation error:', error);
      terminal.writeln('\r\nError establishing connection.');
    }
  };

  useEffect(() => {
    const setupTerminal = async () => {
      if (!terminalRef.current || terminalInstance.current) return;

      try {
        const terminal = new XTerm({
          theme: {
            background: '#1E1E1E',
            foreground: '#ffffff',
            cursor: '#ffffff',
            cursorAccent: '#000000',
            selection: 'rgba(255, 255, 255, 0.3)',
          },
          fontSize: 14,
          fontFamily: 'monospace',
          cursorBlink: true,
          convertEol: true,
          scrollback: 1000,
          allowProposedApi: true,
        });

        terminalInstance.current = terminal;
        terminal.loadAddon(fitAddon.current);
        terminal.open(terminalRef.current);
        
        terminal.writeln('Connecting to DevOS Terminal...');
        connectWebSocket(terminal);

        const handleResize = () => {
          try {
            fitAddon.current.fit();
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              const dims = fitAddon.current.proposeDimensions();
              wsRef.current.send(JSON.stringify({
                type: 'resize',
                cols: dims?.cols,
                rows: dims?.rows
              }));
            }
          } catch (error) {
            console.error('Resize error:', error);
          }
        };

        window.addEventListener('resize', handleResize);
        requestAnimationFrame(handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          wsRef.current?.close();
          terminal.dispose();
        };
      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    setupTerminal();
  }, []);

  return (
    <div className="w-full h-[600px] bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
};

export default Terminal;
