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
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <div className="relative z-10 flex min-h-full items-center justify-center">
            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-charcoal via-ash to-charcoal shadow-2xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-display text-3xl text-sand">{event.title}</h2>
                  <p className="mt-2 text-sm text-clay/75">
                    {event.date}
                    {event.time ? <> • {event.time}</> : null}
                    {event.location ? <> • {event.location}</> : null}
                    {event.entrance ? <> • Entrance: {event.entrance}</> : null}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="self-end rounded-full p-2 text-sand/60 transition hover:bg-white/10 hover:text-sand"
                  aria-label="Close modal"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
                    Name *
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
                    Email *
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
                    />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
                    Phone
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+264 123 456 789"
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
                    Tickets
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      max="10"
                      value={formData.guests}
                      onChange={handleChange}
                      className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-clay/60">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any special requests or questions? (optional)"
                    className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-sand placeholder:text-clay/50 focus:border-flare/60 focus:outline-none"
                  />
                </label>

                {submitStatus && (
                  <div
                    className={`rounded-2xl border px-5 py-3 text-sm ${
                      submitStatus.type === 'success'
                        ? 'border-green-500/30 bg-green-500/10 text-green-400'
                        : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex flex-wrap justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-sand/80 transition hover:border-white/40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flare via-pulse to-flare px-8 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink shadow-[0_18px_32px_rgba(255,107,61,0.32)] transition hover:shadow-[0_22px_42px_rgba(255,107,61,0.42)] disabled:opacity-50 disabled:cursor-not-allowed"
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
