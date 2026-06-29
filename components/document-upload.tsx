"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, Image, X, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "processing" | "verified" | "error"
  preview?: string
}

interface DocumentUploadProps {
  onFilesChange?: (files: UploadedFile[]) => void
  maxSizeMB?: number
  acceptedTypes?: string[]
}

export function DocumentUpload({
  onFilesChange,
  maxSizeMB = 10,
  acceptedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"],
}: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const generateId = () => Math.random().toString(36).substring(2, 9)

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress: 100, status: "processing" }
              : f
          )
        )
        // Simulate OCR processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, status: "verified" } : f
            )
          )
        }, 1500)
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: Math.round(progress) } : f
          )
        )
      }
    }, 200)
  }

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return

      const newUploadedFiles: UploadedFile[] = []

      Array.from(newFiles).forEach((file) => {
        if (file.size > maxSizeBytes) {
          return
        }
        if (!acceptedTypes.includes(file.type)) {
          return
        }

        const id = generateId()
        const preview = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined

        const uploadedFile: UploadedFile = {
          id,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: "uploading",
          preview,
        }

        newUploadedFiles.push(uploadedFile)
        simulateUpload(id)
      })

      setFiles((prev) => {
        const updated = [...prev, ...newUploadedFiles]
        onFilesChange?.(updated)
        return updated
      })
    },
    [maxSizeBytes, acceptedTypes, onFilesChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id)
      onFilesChange?.(updated)
      return updated
    })
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image
    return FileText
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <motion.div
        className={cn(
          "relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/40"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <motion.div
          animate={isDragOver ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: isDragOver ? Infinity : 0 }}
        >
          <Upload className="mx-auto size-10 text-muted-foreground" />
        </motion.div>
        <p className="mt-4 font-medium text-foreground">
          {isDragOver ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          PDF, PNG, JPG up to {maxSizeMB}MB
        </p>
      </motion.div>

      {/* File list */}
      <AnimatePresence>
        {files.map((file) => {
          const Icon = getFileIcon(file.type)
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-3 rounded-xl border bg-card p-3"
            >
              {/* Preview or icon */}
              {file.preview ? (
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="size-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-muted-foreground" />
                </div>
              )}

              {/* File info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(file.size)}
                </p>

                {/* Progress bar */}
                {file.status === "uploading" && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Uploading...</span>
                      <span className="font-medium">{file.progress}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {file.status === "processing" && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      <Upload className="size-3" />
                    </motion.span>
                    Processing OCR...
                  </div>
                )}
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-2">
                {file.status === "verified" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success"
                  >
                    <CheckCircle2 className="size-3" />
                    Verified
                  </motion.div>
                )}
                {file.status === "error" && (
                  <div className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                    <AlertCircle className="size-3" />
                    Error
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(file.id)
                  }}
                  className="rounded-lg p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
