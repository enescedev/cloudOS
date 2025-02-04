'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import 'xterm/css/xterm.css';

interface XtermBashProps {
  containerId?: string;
}

const XtermBash: React.FC<XtermBashProps> = ({ containerId = 'devos' }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const terminalInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    const initTerminal = async () => {
      if (!terminalRef.current || terminalInstance.current) return;

      try {
        // Terminal'i yapılandır
        const terminal = new Terminal({
          theme: {
            background: '#1E1E1E',
            foreground: '#ffffff',
            cursor: '#ffffff',
            cursorAccent: '#000000',
            selection: 'rgba(255, 255, 255, 0.3)',
          },
          cursorBlink: true,
          fontSize: 14,
          fontFamily: 'monospace',
          rows: 24,
          cols: 80,
          convertEol: true,
        });

        // WebSocket bağlantısı kur
        const ws = new WebSocket('ws://localhost:3000/api/terminal');
        const attachAddon = new AttachAddon(ws);
        
        terminal.loadAddon(fitAddon.current);
        terminal.loadAddon(attachAddon);
        
        ws.onopen = () => {
          terminal.write('\r\n*** Connected to DevOS Terminal ***\r\n');
        };

        ws.onclose = () => {
          terminal.write('\r\n*** Terminal disconnected ***\r\n');
        };

        terminalInstance.current = terminal;
        terminal.open(terminalRef.current);
        
        setTimeout(() => {
          fitAddon.current.fit();
          setIsReady(true);
        }, 100);

      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    initTerminal();

    return () => {
      terminalInstance.current?.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] bg-[#1E1E1E] rounded-sm overflow-hidden">
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
};

export default XtermBash;
