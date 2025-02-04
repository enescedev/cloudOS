"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Download, Trash2, Eye, FileIcon } from "lucide-react"

interface S3Config {
  endpoint: string
  accessKey: string
  secretKey: string
}

interface FileItem {
  name: string
  size: number
  lastModified: string
  type: string
}

export default function S3Page() {
  const [config, setConfig] = useState<S3Config>({
    endpoint: "",
    accessKey: "",
    secretKey: ""
  })
  const [isConnected, setIsConnected] = useState(false)
  const [files, setFiles] = useState<FileItem[]>([])
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const handleConnect = () => {
    // S3 bağlantı işlemi burada yapılacak
    setIsConnected(true)
    // Örnek dosya listesi
    setFiles([
      { name: "document.pdf", size: 1024576, lastModified: "2024-03-20", type: "application/pdf" },
      { name: "image.jpg", size: 2048576, lastModified: "2024-03-19", type: "image/jpeg" }
    ])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
            <CardTitle>S3 Manager</CardTitle>
            <CardDescription>S3 uyumlu depolama sistemi yönetimi</CardDescription>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Endpoint URL</Label>
                  <Input
                    id="endpoint"
                    value={config.endpoint}
                    onChange={e => setConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                    placeholder="https://s3.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="access-key">Access Key</Label>
                  <Input
                    id="access-key"
                    value={config.accessKey}
                    onChange={e => setConfig(prev => ({ ...prev, accessKey: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secret-key">Secret Key</Label>
                  <Input
                    id="secret-key"
                    type="password"
                    value={config.secretKey}
                    onChange={e => setConfig(prev => ({ ...prev, secretKey: e.target.value }))}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleConnect}
                >
                  Bağlan
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Dosyalar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Yükle
                      </Button>
                      <Button variant="outline" size="sm" disabled={!selectedFile}>
                        <Download className="w-4 h-4 mr-2" />
                        İndir
                      </Button>
                      <Button variant="outline" size="sm" disabled={!selectedFile}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Sil
                      </Button>
                      <Button variant="outline" size="sm" disabled={!selectedFile}>
                        <Eye className="w-4 h-4 mr-2" />
                        Önizle
                      </Button>
                    </div>
                    <ScrollArea className="h-[400px] border rounded-lg">
                      <div className="divide-y">
                        {files.map(file => (
                          <div
                            key={file.name}
                            className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted ${
                              selectedFile?.name === file.name ? "bg-muted" : ""
                            }`}
                            onClick={() => setSelectedFile(file)}
                          >
                            <FileIcon className="w-8 h-8 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-nowrap">
                              {file.lastModified}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dosya Detayları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedFile ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Dosya Adı</Label>
                          <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                        </div>
                        <div>
                          <Label>Boyut</Label>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                        <div>
                          <Label>Son Değişiklik</Label>
                          <p className="text-sm text-muted-foreground">{selectedFile.lastModified}</p>
                        </div>
                        <div>
                          <Label>Tür</Label>
                          <p className="text-sm text-muted-foreground">{selectedFile.type}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Detayları görüntülemek için bir dosya seçin
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}