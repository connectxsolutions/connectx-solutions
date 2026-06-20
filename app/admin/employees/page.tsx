'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface User {
  _id: string
  email: string
  name?: string
  role: string
}

export default function EmployeesPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user')
  const [submitting, setSubmitting] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/employees')
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      } else {
        console.error('Failed to fetch employees')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setRole('user')
    setEditingUserId(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const endpoint = editingUserId ? `/api/admin/employees/${editingUserId}` : '/api/admin/employees'
      const method = editingUserId ? 'PATCH' : 'POST'
      const body = editingUserId
        ? { name, email, password: password || undefined, role }
        : { name, email, password, role }

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Failed to save employee')
      }

      resetForm()
      fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save employee')
    } finally {
      setSubmitting(false)
    }
  }

  const startEdit = (user: User) => {
    setEditingUserId(user._id)
    setName(user.name || '')
    setEmail(user.email)
    setPassword('')
    setRole(user.role === 'admin' ? 'admin' : 'user')
    setError('')
  }

  const handleCancelEdit = () => {
    resetForm()
  }

  const handleDelete = async (userId: string, userEmail: string) => {
    const confirmed = window.confirm(`Delete ${userEmail} from employees?`)
    if (!confirmed) return

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/employees/${userId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Failed to delete employee')
      }

      if (editingUserId === userId) {
        resetForm()
      }

      fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Employee Management</h1>
              <p className="text-muted-foreground">Only admin users can add, edit, or remove employees.</p>
            </div>
            <Link href="/admin" className="text-primary hover:underline">
              Back to dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Team members</h2>
                {loading ? (
                  <p className="text-muted-foreground">Loading employees...</p>
                ) : (
                  <div className="space-y-4">
                    {users.length === 0 ? (
                      <p className="text-muted-foreground">No employees available yet.</p>
                    ) : (
                      users.map((user) => (
                        <div key={user._id} className="rounded-xl border border-border p-4 bg-background/80">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="text-lg font-semibold text-foreground">{user.name || user.email}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-sm">{user.role}</span>
                              <Button variant="secondary" size="sm" type="button" onClick={() => startEdit(user)}>
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" type="button" onClick={() => handleDelete(user._id, user.email)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {editingUserId ? 'Edit employee' : 'Add new employee'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">{error}</div>}

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Name</label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Employee name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="employee@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={editingUserId ? 'Leave blank to keep existing password' : 'Create a password'}
                  />
                  {editingUserId && (
                    <p className="text-xs text-muted-foreground mt-2">Leave password empty to keep the current password.</p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-foreground mb-2">Role</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="user">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={submitting} size="lg" className="w-full">
                    {submitting ? (editingUserId ? 'Saving...' : 'Adding...') : (editingUserId ? 'Save Changes' : 'Add Employee')}
                  </Button>
                  {editingUserId && (
                    <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleCancelEdit}>
                      Cancel edit
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
