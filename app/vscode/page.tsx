"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"

export default function VSCodePage() {
  const [githubToken, setGithubToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleGitHubAuth = () => {
    if (githubToken) {
      // GitHub token doğrulama işlemi burada yapılacak
      setIsAuthenticated(true)
    }
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
            <CardTitle>VSCode</CardTitle>
            <CardDescription>GitHub Codespaces ile kod düzenleme</CardDescription>
          </CardHeader>
          <CardContent>
            {!isAuthenticated ? (
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github-token">GitHub Token</Label>
                  <Input
                    id="github-token"
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_..."
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleGitHubAuth}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub ile Bağlan
                </Button>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">VSCode ortamı yükleniyor...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}