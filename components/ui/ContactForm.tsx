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

  const fieldStyle = {
    backgroundColor: 'var(--input-bg)',
    borderColor: 'var(--input-border)',
    color: 'var(--heading-color)',
  }

  const baseClass =
    'w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-gray-400'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className={baseClass}
          style={fieldStyle}
          required
        />
        <input
          type="email"
          name="mail"
          placeholder="Your email"
          value={form.mail}
          onChange={handleChange}
          className={baseClass}
          style={fieldStyle}
          required
        />
      </div>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className={baseClass}
        style={fieldStyle}
        required
      />
      <textarea
        name="comment"
        placeholder="Your message..."
        rows={5}
        value={form.comment}
        onChange={handleChange}
        className={`${baseClass} resize-none`}
        style={fieldStyle}
        required
      />
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 cursor-pointer hover:shadow-lg hover:shadow-primary/20"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {status && (
          <p
            className={`text-sm ${
              status.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {status.msg}
          </p>
        )}
      </div>
    </form>
  )
}
