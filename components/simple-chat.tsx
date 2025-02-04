"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  isUser: boolean
}

export function SimpleChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessageToOllama = async (message: string) => {
    try {
      const response = await fetch("http://192.168.1.164:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2",
          prompt: message,
          stream: false
        }),
      })

      if (!response.ok) {
        throw new Error("AI yanıtı alınamadı")
      }

      const data = await response.json()
      return data.response || "Üzgünüm, yanıt oluşturulamadı."
    } catch (error) {
      console.error("Ollama API hatası:", error)
      return "Üzgünüm, bir hata oluştu. Lütfen Ollama servisinin çalıştığından emin olun."
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const aiResponse = await sendMessageToOllama(input)
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 mb-4">
        <div className="flex flex-col gap-4 p-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] rounded-lg px-4 py-2",
                message.isUser
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted rounded-lg px-4 py-2 w-max">
              <span className="animate-pulse">...</span>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="flex gap-2 p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Mesajınızı yazın..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSend}
          disabled={isLoading}
        >
          Gönder
        </Button>
      </div>
    </div>
  )
}