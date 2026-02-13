'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FileText, ScrollText } from 'lucide-react'

interface LyricsDialogProps {
  title: string
  author?: string
  content: string
  triggerClassName?: string
}

export function LyricsDialog({ title, author, content, triggerClassName }: LyricsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 ${triggerClassName}`}
        >
          <ScrollText size={16} />
          Metni Göster
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {title}
          </DialogTitle>
          {author && (
            <DialogDescription className="text-base">
              {author}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-base leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
