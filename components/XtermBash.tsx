'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

interface XtermBashProps {
  containerId?: string;
}

const XtermBash: React.FC<XtermBashProps> = ({ containerId = 'bolt-ai' }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const terminalInstance = useRef<any>(null);
  const fitAddonInstance = useRef<any>(null);

  useEffect(() => {
    const initTerminal = async () => {
      if (!terminalRef.current || terminalInstance.current) return;

      try {
        const terminal = new Terminal({
          theme: {
            background: '#1E1E1E',
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

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        terminalInstance.current = terminal;
        fitAddonInstance.current = fitAddon;

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            terminal.open(terminalRef.current!);
            fitAddon.fit();
            resolve();
          });
        });

        terminal.write('Welcome to CloudOS Terminal\r\n$ ');
        setIsReady(true);

      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    initTerminal();

    return () => {
      if (terminalInstance.current) {
        terminalInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const handleResize = () => {
      try {
        fitAddonInstance.current?.fit();
      } catch (error) {
        console.error('Resize error:', error);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady]);

  return (
    <div className="w-full h-full min-h-[300px] bg-[#1E1E1E] rounded-sm overflow-hidden">
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
};

export default dynamic(() => Promise.resolve(XtermBash), {
  ssr: false
});
