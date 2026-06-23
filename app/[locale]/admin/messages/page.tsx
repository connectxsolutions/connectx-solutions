'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { Trash2, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function MessagesAdmin() {
  const t = useTranslations('Admin')
  const tc = useTranslations('Common')
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
    if (!confirm(tc('confirmDeleteMessage'))) return

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
          <div>
            <h1 className="text-4xl font-bold text-foreground">{t('contactMessages')}</h1>
            <p className="text-muted-foreground mt-2">{t('contactMessagesDesc')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {loading ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    {t('loadingMessages')}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    {t('noMessages')}
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

            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">{t('from')}</label>
                      <p className="text-foreground">{selectedMessage.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">{tc('email')}</label>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" />
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">{tc('subject')}</label>
                      <p className="text-foreground">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">{t('received')}</label>
                      <p className="text-foreground">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <label className="text-sm font-semibold text-muted-foreground mb-2 block">{tc('message')}</label>
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(selectedMessage._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {tc('delete')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                  {t('selectMessage')}
                </div>
              )}
            </div>
          </div>

          <Link href="/admin">
            <Button variant="outline">{tc('backToDashboard')}</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
