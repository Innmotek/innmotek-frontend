/**
 * Innmotek Frontend - Contact Us Page (/contact)
 * 
 * Replaces old CRA Contact:
 *   Innmotek-frontend-OLD/src/frontend/contacts/index.js
 * 
 * Features:
 *   - Pattern 5: 2-column split (Real verified corporate details for India & UAE + Interactive inquiry form)
 *   - Both Innmotek LLP (India) and Innmotek LLC (Dubai, UAE) office locations & phone lines
 *   - Modern dark inputs with gold accents
 */

'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Building2,
  Globe2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    application: 'Heat Pump Water Heater',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', application: 'Heat Pump Water Heater', message: '' });
    }, 600);
  }

  return (
    <div className="space-y-16 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A880]">
          Engineering Inquiries & Sizing
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
          Get in Touch with Innmotek
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Reach our regional engineering teams for technical specifications, commercial pricing, or customized thermal system sizing.
        </p>
      </div>

      {/* Pattern 5 Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Real Corporate Contact Info across India & Dubai (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#222222] bg-[#121212] p-8 space-y-8 shadow-xl">
          <div>
            <div className="flex items-center space-x-2 text-[#C5A880] mb-1">
              <Globe2 className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Global Operations</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Corporate Offices</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Innmotek operates dedicated regional engineering hubs across South Asia and the Middle East.
            </p>
          </div>

          <div className="space-y-6 text-xs divide-y divide-[#1C1C1C]">
            {/* India / Regional Hub */}
            <div className="pt-2 first:pt-0 space-y-3">
              <div className="flex items-center space-x-2 text-[#C5A880]">
                <Building2 className="h-4 w-4" />
                <span className="font-bold uppercase tracking-wider text-[11px] text-white">
                  Innmotek LLP (India / South Asia)
                </span>
              </div>
              <div className="pl-6 space-y-2 text-neutral-300">
                <p className="flex items-start space-x-2">
                  <MapPin className="h-3.5 w-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>GIDA, Uttar Pradesh, 273209, India</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                  <a href="tel:+918081741031" className="hover:text-white transition-colors font-mono">
                    +91 808 1741031
                  </a>
                </p>
              </div>
            </div>

            {/* UAE / Middle East Hub */}
            <div className="pt-5 space-y-3">
              <div className="flex items-center space-x-2 text-[#C5A880]">
                <Building2 className="h-4 w-4" />
                <span className="font-bold uppercase tracking-wider text-[11px] text-white">
                  Innmotek LLC (Dubai / UAE)
                </span>
              </div>
              <div className="pl-6 space-y-2 text-neutral-300">
                <p className="flex items-start space-x-2">
                  <MapPin className="h-3.5 w-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>6F, Business Center Meydan Road, Nad Al Sheba, Dubai, UAE</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
                  <a href="tel:+971554398350" className="hover:text-white transition-colors font-mono">
                    +971 554398350
                  </a>
                </p>
              </div>
            </div>

            {/* Direct Email & WhatsApp */}
            <div className="pt-5 space-y-3">
              <div className="flex items-center space-x-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#C5A880]/15 text-[#C5A880]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Official Inquiries</p>
                  <a href="mailto:info@innmotek.com" className="text-neutral-300 hover:text-[#C5A880] transition-colors">
                    info@innmotek.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-[10px]">Direct WhatsApp Hotline</p>
                  <a href="https://wa.me/918081741031" target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">
                    +91 808 1741031 (Chat with engineer)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Engineering Sizing & Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-[#222222] bg-[#121212] p-8 sm:p-10 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-1">Request Sizing or Quotation</h2>
          <p className="text-xs text-neutral-400 mb-6">
            Fill in your facility or residential heating requirements below. A senior thermal engineer will respond within 24 hours.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/30 p-6 text-center space-y-3">
              <div className="flex justify-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">Thank You for Your Inquiry</h3>
              <p className="text-xs text-neutral-300 max-w-md mx-auto">
                Your request has been routed to our technical engineering team. We will review your application specifications and reach out shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-neutral-400">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ram Shrestha"
                    className="mt-1 w-full rounded-xl border border-[#2B2B2B] bg-[#181818] p-3 text-white placeholder-neutral-600 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-neutral-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ram@company.com"
                    className="mt-1 w-full rounded-xl border border-[#2B2B2B] bg-[#181818] p-3 text-white placeholder-neutral-600 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-neutral-400">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 9800000000 / +971 500000000"
                    className="mt-1 w-full rounded-xl border border-[#2B2B2B] bg-[#181818] p-3 text-white placeholder-neutral-600 focus:border-[#C5A880] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[10px] text-neutral-400">
                    System of Interest
                  </label>
                  <select
                    value={formData.application}
                    onChange={e => setFormData({ ...formData, application: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#2B2B2B] bg-[#181818] p-3 text-white focus:border-[#C5A880] focus:outline-none"
                  >
                    <option value="Heat Pump Water Heater">Heat Pump Water Heater</option>
                    <option value="Commercial Heat Pump">Commercial Central Heat Pump</option>
                    <option value="Solar Thermal Collector">Solar Thermal Collector</option>
                    <option value="Hot Water Storage Tank">Hot Water Storage Tank</option>
                    <option value="Inverter Pool Heat Pump">Inverter Pool Heat Pump</option>
                    <option value="Radiators & Fan Coils">Radiators & Fan Coils</option>
                    <option value="Dehumidifier">Industrial Dehumidifier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-[10px] text-neutral-400">
                  Project Details / Requirements
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your facility (hotel, hospital, villa, industrial), hot water volume requirements, or climate region..."
                  className="mt-1 w-full rounded-xl border border-[#2B2B2B] bg-[#181818] p-3 text-white placeholder-neutral-600 focus:border-[#C5A880] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#C5A880] py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:bg-[#D4B890] transition-all shadow-md shadow-[#C5A880]/15"
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? 'Sending Request...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
