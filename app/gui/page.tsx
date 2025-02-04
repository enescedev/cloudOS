"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, Clock, ArrowRight, Monitor } from "lucide-react"
import { saveRDPConnection, getRDPConnections, toggleRDPFavorite } from '@/lib/rdp-storage'

export default function GUIPage() {
  const [connections, setConnections] = useState(getRDPConnections());
  const [rdpConfig, setRdpConfig] = useState({
    host: '',
    username: '',
    password: '',
    port: '3389'
  });
  const [isGUIStarted, setIsGUIStarted] = useState(false);

  useEffect(() => {
    setConnections(getRDPConnections());
  }, []);

  const startRDP = () => {
    saveRDPConnection({
      id: crypto.randomUUID(),
      ...rdpConfig,
      isFavorite: false
    });
    setConnections(getRDPConnections());
    
    // RDP bağlantısını yeni pencerede aç
    const guiWindow = window.open('', 'RDP Connection', 'width=1024,height=768');
    if (guiWindow) {
      guiWindow.document.write(`
        <html>
          <head>
            <title>RDP Connection - ${rdpConfig.host}</title>
          </head>
          <body style="margin: 0; background: black;">
            <div id="rdp-container" style="width: 100vw; height: 100vh;"></div>
            <script>
              window.rdpConfig = ${JSON.stringify(rdpConfig)};
            </script>
          </body>
        </html>
      `);
      setIsGUIStarted(true);
    }
  };

  const handleFavoriteClick = (connectionId: string) => {
    toggleRDPFavorite(connectionId);
    setConnections(getRDPConnections());
  };

  const loadConnection = (connection: any) => {
    setRdpConfig({
      host: connection.host,
      username: connection.username,
      password: connection.password,
      port: connection.port
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
            <CardTitle>Remote Desktop Connection</CardTitle>
            <CardDescription>Connect to remote desktop via RDP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="host">Host</Label>
                <Input 
                  id="host" 
                  placeholder="example.com or IP address"
                  value={rdpConfig.host}
                  onChange={(e) => setRdpConfig({...rdpConfig, host: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    placeholder="username"
                    value={rdpConfig.username}
                    onChange={(e) => setRdpConfig({...rdpConfig, username: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="port">Port</Label>
                  <Input 
                    id="port"
                    placeholder="3389"
                    value={rdpConfig.port}
                    onChange={(e) => setRdpConfig({...rdpConfig, port: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="password"
                  value={rdpConfig.password}
                  onChange={(e) => setRdpConfig({...rdpConfig, password: e.target.value})}
                />
              </div>
              <Button onClick={startRDP} className="mt-4">
                <Monitor className="w-4 h-4 mr-2" />
                Connect RDP
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Favori Bağlantılar */}
        <Card>
          <CardHeader>
            <CardTitle>Favorite Connections</CardTitle>
            <CardDescription>Your saved RDP connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {connections.filter(c => c.isFavorite).map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{connection.username}@{connection.host}:{connection.port}</p>
                    <p className="text-sm text-muted-foreground">
                      Last used: {connection.lastUsed ? new Date(connection.lastUsed).toLocaleString() : 'N/A'}
                    </p>
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

        {/* Recent Connections */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Connections</CardTitle>
            <CardDescription>Your RDP connection history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {connections.filter(c => !c.isFavorite).slice(0, 5).map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{connection.username}@{connection.host}:{connection.port}</p>
                    <p className="text-sm text-muted-foreground">
                      Last used: {new Date(connection.lastUsed ?? '').toLocaleString()}
                    </p>
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