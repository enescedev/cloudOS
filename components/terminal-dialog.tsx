"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Terminal, Minus, Square, X } from "lucide-react"
import XtermBash from "./XtermBash"

interface TerminalDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function TerminalDialog({ isOpen, onOpenChange }: TerminalDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] bg-[#2B2B2B] border border-[#363636] shadow-lg">
        <DialogHeader className="bg-[#323232] px-4 py-1.5 border-b border-[#404040] flex justify-between items-center">
          <DialogTitle className="flex items-center gap-2 text-gray-200">
            <Terminal className="h-4 w-4" />
            Terminal
          </DialogTitle>
          <div className="flex items-center gap-4">
            <button className="hover:bg-[#404040] p-1 rounded">
              <Minus className="h-4 w-4 text-gray-400" />
            </button>
            <button className="hover:bg-[#404040] p-1 rounded">
              <Square className="h-4 w-4 text-gray-400" />
            </button>
            <button 
              onClick={() => onOpenChange(false)}
              className="hover:bg-red-500 p-1 rounded"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-white" />
            </button>
          </div>
        </DialogHeader>
        <div className="flex-1 h-full bg-[#1E1E1E] p-2 font-mono text-sm">
          <XtermBash containerId="bolt-ai" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
