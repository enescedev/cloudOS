'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { SimpleChat } from "@/components/simple-chat";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from 'react';

export default function AIPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);

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
            <CardTitle>AI Chat</CardTitle>
            <CardDescription>Talk with AI Assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isAIOpen} onOpenChange={setIsAIOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <SimpleChat />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
