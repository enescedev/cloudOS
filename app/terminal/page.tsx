'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from 'react';
import { saveConnection, getConnections, toggleFavorite } from '@/lib/storage';
import dynamic from 'next/dynamic';

interface SSHConnection {
  id: string;
  host: string;
  username: string;
  password: string;
  isFavorite: boolean;
  lastUsed?: Date;
}

// Terminal bileşenini dinamik olarak import et
const XtermTerminal = dynamic(() => import('@/components/XtermTerminal'), {
  ssr: false
})

export default function TerminalPage() {
  const [connections, setConnections] = useState<SSHConnection[]>([]);
  const [sshConfig, setSshConfig] = useState({
    host: '',
    username: '',
    password: ''
  });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    setConnections(getConnections());
  }, []);

  const handleConnect = () => {
    saveConnection({
      id: crypto.randomUUID(),
      ...sshConfig,
      isFavorite: false
    });
    setConnections(getConnections());
    const terminalWindow = window.open('', 'Terminal', 'width=800,height=600');
    if (terminalWindow) {
      terminalWindow.document.write(`
        <html>
          <head>
            <title>SSH Terminal</title>
            <link rel="stylesheet" href="/xterm.css" />
          </head>
          <body style="margin: 0; background: black;">
            <div id="terminal" style="width: 100vw; height: 100vh;"></div>
            <script>
              window.sshConfig = ${JSON.stringify(sshConfig)};
            </script>
          </body>
        </html>
      `);
      setIsTerminalOpen(true);
    }
  };

  const handleFavoriteClick = (connectionId: string) => {
    toggleFavorite(connectionId);
    setConnections(getConnections());
  };

  const loadConnection = (connection: any) => {
    setSshConfig({
      host: connection.host,
      username: connection.username,
      password: connection.password
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Terminal</CardTitle>
            <CardDescription>Connect to your remote server via SSH</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="host">Host</Label>
                <Input 
                  id="host" 
                  placeholder="example.com or IP address"
                  value={sshConfig.host}
                  onChange={(e) => setSshConfig({...sshConfig, host: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="username"
                  value={sshConfig.username}
                  onChange={(e) => setSshConfig({...sshConfig, username: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="password"
                  value={sshConfig.password}
                  onChange={(e) => setSshConfig({...sshConfig, password: e.target.value})}
                />
              </div>
              <Button onClick={handleConnect} className="mt-4">
                Connect SSH
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Favori Bağlantılar */}
        <Card>
          <CardHeader>
            <CardTitle>Favorite Connections</CardTitle>
            <CardDescription>Your saved SSH connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {connections.filter(c => c.isFavorite).map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{connection.username}@{connection.host}</p>
                    <p className="text-sm text-muted-foreground">Last used: {connection.lastUsed ? new Date(connection.lastUsed).toLocaleString() : 'N/A'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleFavoriteClick(connection.id)}>
                      <Star className="w-4 h-4 fill-current" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => loadConnection(connection)}>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bağlantı Geçmişi */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Connections</CardTitle>
            <CardDescription>Your SSH connection history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {connections.filter(c => !c.isFavorite).slice(0, 5).map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{connection.username}@{connection.host}</p>
                    <p className="text-sm text-muted-foreground">Last used: {new Date(connection.lastUsed ?? '').toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleFavoriteClick(connection.id)}>
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => loadConnection(connection)}>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}