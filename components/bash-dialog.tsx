"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Terminal, Minimize2, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import dynamic from "next/dynamic"

const TerminalComponent = dynamic(() => import('./terminal'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-[#1E1E1E] rounded-lg flex items-center justify-center">
      <div className="text-white opacity-50">Loading terminal...</div>
    </div>
  ),
})

interface BashDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function BashDialog({ isOpen, onOpenChange }: BashDialogProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`${
        isFullscreen ? 'fixed inset-0 m-0 rounded-none' : 'max-w-[90vw] w-[1024px]'
      } h-[80vh] p-0 gap-0 bg-[#2B2B2B] border border-[#363636] shadow-lg`}>
        <DialogHeader className="bg-[#323232] px-4 py-2 border-b border-[#404040] flex flex-row justify-between items-center">
          <DialogTitle className="flex items-center gap-2 text-gray-200">
            <Terminal className="h-4 w-4" />
            DevOS Terminal
          </DialogTitle>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Square className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onOpenChange(false)}
              className="hover:bg-red-500/10 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className={`flex-1 ${isFullscreen ? 'h-[calc(100vh-48px)]' : 'h-[calc(80vh-48px)]'} overflow-hidden bg-[#1E1E1E]`}>
          <TerminalComponent containerId="devos" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
