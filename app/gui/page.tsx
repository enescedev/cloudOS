"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GUIPage() {
  const [isGUIStarted, setIsGUIStarted] = useState(false)

  const startGUI = () => {
    setIsGUIStarted(true)
    // GUI başlatma işlemi burada yapılacak
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
            <CardTitle>Web GUI</CardTitle>
            {/* <CardDescription>Linux masaüstü ortamı</CardDescription> */}
          </CardHeader>
          <CardContent>
            {!isGUIStarted ? (
              <div className="text-center">
                <Button onClick={startGUI} size="lg">
                  GUI Ortamını Başlat
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  Başlatıldıktan sonra yeni bir pencerede açılacaktır.
                </p>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">GUI ortamı yeni pencerede açıldı.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}