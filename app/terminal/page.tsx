'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useEffect, useRef } from 'react';
import 'xterm/css/xterm.css';

export default function TerminalPage() {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new Terminal({
        theme: {
          background: '#000000',
          foreground: '#ffffff'
        },
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Courier New'
      });

      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      
      terminal.open(terminalRef.current);
      
      // Terminal açıldıktan sonra fit fonksiyonunu çağır
      setTimeout(() => {
        fitAddon.fit();
      }, 100);
      
      terminal.write('\x1b[1;32muser@localhost:~$\x1b[0m ');
      
      // Pencere boyutu değiştiğinde fit fonksiyonunu çağır
      const handleResize = () => {
        setTimeout(() => {
          fitAddon.fit();
        }, 100);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        terminal.dispose();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Terminal</CardTitle>
            <CardDescription>Access your cloud terminal environment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full rounded-md border">
              <div ref={terminalRef} className="h-full" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}