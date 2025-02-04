'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"

export default function BrowserPage() {
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
            <CardTitle>Browser</CardTitle>
            <CardDescription>Embedded web browser</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] w-full rounded-md border overflow-hidden">
              <iframe 
                src="https://www.mozilla.org/en-US/firefox/new/"
                className="w-full h-full"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                allow="fullscreen"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}