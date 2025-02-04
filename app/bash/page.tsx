'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

interface XtermBashProps {
  containerId: string;
}

const XtermBash = ({ containerId }: XtermBashProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new Terminal();
      terminal.open(terminalRef.current);
      // Add your terminal logic here using containerId
    }
  }, [containerId]);

  return <div ref={terminalRef} />;
};

export default function BashPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Bash Terminal</CardTitle>
            <CardDescription>Interactive terminal for your Docker container</CardDescription>
          </CardHeader>
          <CardContent>
            <XtermBash containerId="bolt-ai" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
 }
