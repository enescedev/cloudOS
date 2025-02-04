"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface APIKeys {
  github: string
  ollama: string
  openai: string
  s3: {
    endpoint: string
    accessKey: string
    secretKey: string
  }
}

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    github: "",
    ollama: "",
    openai: "",
    s3: {
      endpoint: "",
      accessKey: "",
      secretKey: ""
    }
  })

  const handleSave = () => {
    // API anahtarlarını kaydetme işlemi burada yapılacak
    console.log("API anahtarları kaydedildi:", apiKeys)
  }

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
            <CardTitle>Ayarlar</CardTitle>
            <CardDescription>API anahtarlarını ve entegrasyon ayarlarını yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ai">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ai">AI Servisleri</TabsTrigger>
                <TabsTrigger value="storage">Depolama</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ai" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Token</Label>
                  <Input
                    id="github"
                    type="password"
                    value={apiKeys.github}
                    onChange={e => setApiKeys(prev => ({ ...prev, github: e.target.value }))}
                    placeholder="ghp_..."
                  />
                  <p className="text-sm text-muted-foreground">
                    VSCode ve GitHub Codespaces entegrasyonu için gerekli
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ollama">Ollama API URL</Label>
                  <Input
                    id="ollama"
                    value={apiKeys.ollama}
                    onChange={e => setApiKeys(prev => ({ ...prev, ollama: e.target.value }))}
                    placeholder="http://localhost:11434"
                  />
                  <p className="text-sm text-muted-foreground">
                    Yerel Ollama AI servisi için API adresi
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openai">OpenAI API Key</Label>
                  <Input
                    id="openai"
                    type="password"
                    value={apiKeys.openai}
                    onChange={e => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                    placeholder="sk-..."
                  />
                  <p className="text-sm text-muted-foreground">
                    OpenAI servisleri için API anahtarı
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="storage" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="s3-endpoint">S3 Endpoint</Label>
                  <Input
                    id="s3-endpoint"
                    value={apiKeys.s3.endpoint}
                    onChange={e => setApiKeys(prev => ({
                      ...prev,
                      s3: { ...prev.s3, endpoint: e.target.value }
                    }))}
                    placeholder="https://s3.example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="s3-access">S3 Access Key</Label>
                  <Input
                    id="s3-access"
                    value={apiKeys.s3.accessKey}
                    onChange={e => setApiKeys(prev => ({
                      ...prev,
                      s3: { ...prev.s3, accessKey: e.target.value }
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="s3-secret">S3 Secret Key</Label>
                  <Input
                    id="s3-secret"
                    type="password"
                    value={apiKeys.s3.secretKey}
                    onChange={e => setApiKeys(prev => ({
                      ...prev,
                      s3: { ...prev.s3, secretKey: e.target.value }
                    }))}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={handleSave} className="mt-6">
              Ayarları Kaydet
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}