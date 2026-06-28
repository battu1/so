'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  business: '',
  message: '',
  website: '',
};

export default function LeadPopup() {
  // UI state is kept inside this client component so the rest of the page can stay server-rendered.
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const nameInput = useRef(null);

  useEffect(() => {
    // Automatically show the form once per browser tab/session shortly after arrival.
    if (sessionStorage.getItem('localsync-lead-popup-seen')) return;
    const timer = window.setTimeout(() => setOpen(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Any link with data-open-lead can open the same modal without duplicating popup logic.
    const openFromCta = (event) => {
      const trigger = event.target.closest('[data-open-lead]');
      if (!trigger) return;
      event.preventDefault();
      setStatus('idle');
      setError('');
      setOpen(true);
    };
    document.addEventListener('click', openFromCta);
    return () => document.removeEventListener('click', openFromCta);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Focus the first field for accessibility, lock page scrolling and support Escape to close.
    nameInput.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePopup();
    };
    document.body.classList.add('popupOpen');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('popupOpen');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function closePopup() {
    // Remember dismissal for automatic visits; CTA clicks can still reopen the form at any time.
    sessionStorage.setItem('localsync-lead-popup-seen', 'true');
    setOpen(false);
  }

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      // Visitor data is sent to our own API route; email credentials never reach the browser.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('success');
      sessionStorage.setItem('localsync-lead-popup-seen', 'true');
      setForm(initialForm);
    } catch (submitError) {
      setStatus('error');
      setError(submitError.message);
    }
  }

  if (!open) return null;

  return (
    <div className="leadOverlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closePopup()}>
      <section className="leadModal" role="dialog" aria-modal="true" aria-labelledby="lead-title">
        <button className="leadClose" type="button" onClick={closePopup} aria-label="Close enquiry form"><X /></button>
        <div className="leadIntro">
          <span className="leadKicker">LET'S GROW TOGETHER</span>
          <h2 id="lead-title">Ready to stand out <em>online?</em></h2>
          <p>Tell us a little about your business. We’ll review it personally and get back to you within one business day.</p>
          <div className="leadBenefits"><span>✓ Free initial consultation</span><span>✓ Clear, no-pressure next steps</span><span>✓ Built for local business growth</span></div>
        </div>

        {status === 'success' ? (
          <div className="leadSuccess" aria-live="polite">
            <CheckCircle2 />
            <h3>Thank you!</h3>
            <p>Your details have reached LocalSync. We’ll be in touch shortly.</p>
            <button className="button" type="button" onClick={closePopup}>Continue exploring <ArrowRight size={17} /></button>
          </div>
        ) : (
          <form className="leadForm" onSubmit={submitForm}>
            <div className="leadField"><label htmlFor="lead-name">Your name *</label><input ref={nameInput} id="lead-name" name="name" value={form.name} onChange={updateField} autoComplete="name" required minLength={2} placeholder="Your full name" /></div>
            <div className="leadTwoCols">
              <div className="leadField"><label htmlFor="lead-email">Email *</label><input id="lead-email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required placeholder="you@business.com" /></div>
              <div className="leadField"><label htmlFor="lead-phone">Phone</label><input id="lead-phone" name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" placeholder="Your number" /></div>
            </div>
            <div className="leadField"><label htmlFor="lead-business">Business name *</label><input id="lead-business" name="business" value={form.business} onChange={updateField} autoComplete="organization" required placeholder="Your business or brand" /></div>
            <div className="leadField"><label htmlFor="lead-message">What do you need?</label><textarea id="lead-message" name="message" value={form.message} onChange={updateField} rows={3} placeholder="A new website, redesign, SEO..." /></div>
            {/* Hidden honeypot: bots often fill this field, while real visitors never see it. */}
            <div className="leadTrap" aria-hidden="true"><label htmlFor="lead-website">Website</label><input id="lead-website" name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" /></div>
            {error && <p className="leadError" role="alert">{error}</p>}
            <button className="button leadSubmit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><Loader2 className="spin" size={18} /> Sending…</> : <>Get my free consultation <ArrowRight size={18} /></>}</button>
            <small>By submitting, you agree to be contacted about your enquiry. We never sell your details.</small>
          </form>
        )}
      </section>
    </div>
  );
}
