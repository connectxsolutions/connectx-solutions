'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Mail } from 'lucide-react'

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id))
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-foreground">Contact Messages</h1>
            <p className="text-muted-foreground mt-2">View and manage incoming contact form submissions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {loading ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    No messages yet
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <button
                        key={message._id}
                        onClick={() => setSelectedMessage(message)}
                        className={`w-full text-left px-4 py-3 border-b border-border hover:bg-card/80 transition-colors ${
                          selectedMessage?._id === message._id ? 'bg-primary/10' : ''
                        }`}
                      >
                        <div className="font-medium text-foreground text-sm truncate">{message.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{message.email}</div>
                        <div className="text-xs text-muted-foreground truncate mt-1">{message.subject}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">From</label>
                      <p className="text-foreground">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Email</label>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" />
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Subject</label>
                      <p className="text-foreground">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Received</label>
                      <p className="text-foreground">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">Message</label>
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(selectedMessage._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                  Select a message to view details
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <Link href="/admin">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
