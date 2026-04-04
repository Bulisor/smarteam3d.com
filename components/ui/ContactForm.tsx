'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', mail: '', subject: '', comment: '' })
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setStatus({ type: data.info === 'success' ? 'success' : 'error', msg: data.msg })
      if (data.info === 'success') {
        setForm({ name: '', mail: '', subject: '', comment: '' })
      }
    } catch {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-primary transition-colors text-headings bg-white'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <input
        type="email"
        name="mail"
        placeholder="Email"
        value={form.mail}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <textarea
        name="comment"
        placeholder="Message"
        rows={5}
        value={form.comment}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary hover:bg-red-800 text-white px-8 py-3 font-semibold transition-colors disabled:opacity-60 cursor-pointer"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {loading ? 'Sending...' : 'Send message'}
      </button>
      {status && (
        <p
          className={`text-sm mt-2 ${
            status.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status.msg}
        </p>
      )}
    </form>
  )
}
