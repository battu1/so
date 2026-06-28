import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Normalize and limit all visitor-controlled text before it is processed.
function clean(value, maxLength = 1000) {
  return String(value || '').trim().slice(0, maxLength);
}

// Escape values before placing them in the HTML email template.
function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]);
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Silently accept honeypot submissions so bots do not learn how filtering works.
    if (body.website) return NextResponse.json({ ok: true });

    const name = clean(body.name, 100);
    const email = clean(body.email, 160);
    const phone = clean(body.phone, 50);
    const business = clean(body.business, 160);
    const message = clean(body.message, 2000);

    if (name.length < 2 || !emailPattern.test(email) || !business) {
      return NextResponse.json({ error: 'Please enter your name, a valid email and business name.' }, { status: 400 });
    }

    // These server-only environment variables are configured in .env.local or the hosting dashboard.
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    if (!apiKey || !toEmail || !fromEmail) {
      console.error('Contact email environment variables are not configured.');
      return NextResponse.json({ error: 'Email delivery is being configured. Please contact us directly for now.' }, { status: 503 });
    }

    const safe = {
      name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone || 'Not provided'),
      business: escapeHtml(business), message: escapeHtml(message || 'Not provided').replace(/\n/g, '<br />'),
    };
    // Resend delivers the enquiry to LocalSync; reply_to lets the team answer the visitor directly.
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New LocalSync enquiry — ${business}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#092c35"><h1 style="color:#43b877">New website enquiry</h1><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Business:</strong> ${safe.business}</p><p><strong>Project details:</strong><br>${safe.message}</p><hr><small>Sent securely from the LocalSync website.</small></div>`,
      }),
    });

    if (!response.ok) {
      console.error('Resend delivery failed:', response.status, await response.text());
      return NextResponse.json({ error: 'We could not send your enquiry. Please try again in a moment.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Invalid request. Please try again.' }, { status: 400 });
  }
}
