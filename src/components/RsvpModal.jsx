'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function RsvpModal({ isOpen, onClose, event }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      setSubmitStatus(null)
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventTitle: event.title,
          eventDate: event.date,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus({ type: 'success', message: 'RSVP submitted successfully! We\'ll be in touch soon.' })
        setFormData({ name: '', email: '', phone: '', guests: 1, message: '' })
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to submit RSVP. Please try again.' })
      }
    } catch (error) {
      console.error('RSVP error:', error)
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!event) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-modal-title"
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          <div className="relative z-10 flex min-h-full items-center justify-center">
            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#0b0b0b] shadow-2xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="brand-eyebrow">Event RSVP</p>
                    <h2 id="rsvp-modal-title" className="font-display text-3xl text-sand">{event.title}</h2>
                    <p className="mt-2 text-sm text-zinc-300">
                      {event.date}
                      {event.time ? <> • {event.time}</> : null}
                      {event.location ? <> • {event.location}</> : null}
                      {event.entrance ? <> • Entrance: {event.entrance}</> : null}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="self-end rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:border-white/40"
                    aria-label="Close modal"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
                      Name *
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="brand-input"
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
                      Email *
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="brand-input"
                      />
                    </label>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
                      Phone
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+264 123 456 789"
                        className="brand-input"
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
                      Tickets
                      <input
                        type="number"
                        name="guests"
                        min="1"
                        max="10"
                        value={formData.guests}
                        onChange={handleChange}
                        className="brand-input"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
                    Message
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requests or questions? (optional)"
                      className="brand-textarea"
                    />
                  </label>

                  {submitStatus && (
                    <div
                      className={`rounded-2xl border px-5 py-3 text-sm ${submitStatus.type === 'success'
                        ? 'border-green-500/30 bg-green-500/10 text-green-300'
                        : 'border-red-500/30 bg-red-500/10 text-red-300'
                        }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <div className="flex flex-wrap justify-end gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="brand-button brand-button-ghost"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="brand-button brand-button-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
