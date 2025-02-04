"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags(prev => [...new Set([...prev, tagInput.trim()])])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>Kişisel bilgilerinizi ve tercihlerinizi yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button>Fotoğraf Değiştir</Button>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Ad</Label>
                  <Input id="name" placeholder="Adınız" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="surname">Soyad</Label>
                  <Input id="surname" placeholder="Soyadınız" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" placeholder="ornek@email.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" placeholder="+90" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ai-key">AI API Anahtarı</Label>
                  <Input id="ai-key" type="password" placeholder="sk-..." />
                </div>

                <div className="grid gap-2">
                  <Label>İlgi Alanları</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <Input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Etiket eklemek için yazın ve Enter'a basın"
                  />
                </div>
              </div>

              <Button className="w-full">Değişiklikleri Kaydet</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}