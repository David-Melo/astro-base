---
alwaysApply: false
---
# Implementing Forms with the Mailer API

This guide covers how to integrate contact forms and email submission with the centralized mailer service.

## Usage

This is designed to go into an astro API route. one backend api route should be able to handle any number of forms.

## Important: Server-to-Server Architecture

> **This API does NOT accept direct browser requests.**  
> All requests must go through your own server/API route first.

```
┌─────────┐      ┌──────────────────┐      ┌─────────────────┐
│ Browser │ ───▶ │ Your API Route   │ ───▶ │ Mailer Worker   │
│  Form   │      │ (Astro.js, etc.) │      │ (Cloudflare)    │
└─────────┘      └──────────────────┘      └─────────────────┘
```

Requests with an `Origin` header (browser requests) are automatically rejected with a `403` error.

---

## Authentication

Every request requires **two** authentication factors:

1. **API Key** - Sent via the `X-API-Key` header
2. **Domain Whitelist** - The `domain` field in the request body must be pre-approved

```javascript
const headers = {
  'Content-Type': 'application/json',
  'X-API-Key': process.env.MAILER_API_KEY,
};
```

---

## Endpoint

```
POST https://mailer.<your-domain>.workers.dev/send
```

---

## Request Body Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `domain` | `string` | ✅ | Your whitelisted domain (e.g., `"example.com"`) |
| `to` | `string \| string[]` | ✅ | Recipient email(s) |
| `subject` | `string` | ✅ | Email subject (max 200 chars) |
| `text` | `string` | ⚠️ | Plain text body (required if `fields` not provided) |
| `fields` | `object` | ⚠️ | Form fields object (required if `text` not provided) |
| `html` | `string` | ❌ | HTML body (optional, auto-generated if using `fields`) |
| `from` | `{ email, name? }` | ❌ | Sender (defaults to configured sender) |
| `replyTo` | `string` | ❌ | Reply-to email address |
| `cc` | `string[]` | ❌ | Carbon copy recipients |
| `bcc` | `string[]` | ❌ | Blind carbon copy recipients |

### Two Modes

**Form Mode** (Prefered Method & Highly Recommended for all basic contact forms)
- Provide `fields` object with key-value pairs
- Beautiful HTML email is auto-generated
- Keys are converted from `camelCase`/`snake_case` to "Title Case"

**Manual Mode**
- Provide `text` (and optionally `html`) directly
- Full control over email content

---

## Examples

### 1. Basic Contact Form (Form Mode)

```javascript
// Your API route (e.g., /api/contact)
export async function POST(request) {
  const formData = await request.json();

  const response = await fetch('https://mailer.example.workers.dev/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.MAILER_API_KEY,
    },
    body: JSON.stringify({
      domain: 'yoursite.com',
      to: 'contact@yoursite.com',
      subject: `New Contact Form: ${formData.name}`,
      replyTo: formData.email,
      fields: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
    }),
  });

  const result = await response.json();
  return Response.json(result);
}
```

### 2. Quote Request Form (Form Mode)

```javascript
const response = await fetch('https://mailer.example.workers.dev/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.MAILER_API_KEY,
  },
  body: JSON.stringify({
    domain: 'yoursite.com',
    to: ['sales@yoursite.com', 'quotes@yoursite.com'],
    subject: 'New Quote Request',
    replyTo: formData.email,
    fields: {
      customerName: formData.name,
      companyName: formData.company,
      email: formData.email,
      phoneNumber: formData.phone,
      projectDescription: formData.description,
      budgetRange: formData.budget,
      timeline: formData.timeline,
      preferredContactMethod: formData.contactMethod,
    },
  }),
});
```

### 3. Manual Mode (Custom HTML)

```javascript
const response = await fetch('https://mailer.example.workers.dev/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.MAILER_API_KEY,
  },
  body: JSON.stringify({
    domain: 'yoursite.com',
    to: 'admin@yoursite.com',
    subject: 'Weekly Report',
    text: 'Plain text version for email clients that do not support HTML.',
    html: `
      <h1>Weekly Report</h1>
      <p>Here is your weekly summary...</p>
      <ul>
        <li>Item 1: 42 sales</li>
        <li>Item 2: 18 leads</li>
      </ul>
    `,
  }),
});
```

### 4. Full Next.js API Route Example

```javascript
// app/api/contact/route.js (Next.js App Router)
import { NextResponse } from 'next/server';

const MAILER_URL = process.env.MAILER_URL;
const MAILER_API_KEY = process.env.MAILER_API_KEY;
const SITE_DOMAIN = 'yoursite.com';

export async function POST(request) {
  try {
    // 1. Parse form data
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 2. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Send to mailer
    const response = await fetch(`${MAILER_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': MAILER_API_KEY,
      },
      body: JSON.stringify({
        domain: SITE_DOMAIN,
        to: 'contact@yoursite.com',
        subject: `Contact Form: ${name}`,
        replyTo: email,
        fields: {
          name,
          email,
          phone: phone || 'Not provided',
          message,
          submittedAt: new Date().toISOString(),
        },
      }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Mailer error:', result);
      return NextResponse.json(
        { success: false, error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 5. Astro API Route Example

```typescript
// src/pages/api/contact.ts (Astro with SSR)
import type { APIRoute } from 'astro';

const MAILER_URL = import.meta.env.MAILER_URL;
const MAILER_API_KEY = import.meta.env.MAILER_API_KEY;
const SITE_DOMAIN = 'yoursite.com';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Parse form data
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 2. Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Send to mailer
    const response = await fetch(`${MAILER_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': MAILER_API_KEY,
      },
      body: JSON.stringify({
        domain: SITE_DOMAIN,
        to: 'contact@yoursite.com',
        subject: `Contact Form: ${name}`,
        replyTo: email,
        fields: {
          name,
          email,
          phone: phone || 'Not provided',
          message,
          submittedAt: new Date().toISOString(),
        },
      }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Mailer error:', result);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send message' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
```

> **Note:** Astro requires `output: 'server'` or `output: 'hybrid'` in `astro.config.mjs` for API routes to work.

### 6. Frontend Form Example

```javascript
// React component
async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);
  setError(null);

  const formData = new FormData(event.target);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Something went wrong');
    }

    setSuccess(true);
    event.target.reset();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
```

---

## Response Format

### Success Response (200)

```json
{
  "success": true,
  "messageId": "abc123..."
}
```

### Error Responses

**400 - Validation Error**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "'to' is not a valid email address",
    "'subject' field is required"
  ]
}
```

**401 - Authentication Error**
```json
{
  "success": false,
  "error": "Invalid or missing API key"
}
```

**403 - Domain Not Whitelisted**
```json
{
  "success": false,
  "error": "Domain not in whitelist",
  "domain": "unknown-site.com"
}
```

**403 - Browser Request Rejected**
```json
{
  "success": false,
  "error": "Direct browser requests not allowed"
}
```

---

## Limits

| Limit | Value |
|-------|-------|
| Subject length | 200 characters |
| Text body size | 50 KB |
| HTML body size | 50 KB |
| Total recipients (to + cc + bcc) | 50 |

---

## Best Practices

### 1. Always Validate on Your Server

Never trust client input. Validate before forwarding to the mailer:

```javascript
// Basic validation
if (!email || !email.includes('@')) {
  return { error: 'Invalid email' };
}

if (message.length > 10000) {
  return { error: 'Message too long' };
}
```

### 2. Use Environment Variables

Never hardcode the API key:

```bash
# .env.local
MAILER_URL=https://mailer.example.workers.dev
MAILER_API_KEY=your-secret-key
```

### 3. Add Rate Limiting

Protect against spam and abuse:

```javascript
// Using Vercel KV, Upstash, or similar
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
});

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // ... proceed with form submission
}
```

### 4. Include Reply-To

Always set `replyTo` to the submitter's email so you can reply directly:

```javascript
{
  to: 'yourteam@company.com',
  replyTo: formData.email,  // ← The person who filled out the form
  // ...
}
```

### 5. Use Honeypot Fields

Add invisible fields to catch bots:

```html
<!-- Hidden honeypot field -->
<input
  type="text"
  name="website"
  style="display: none"
  tabindex="-1"
  autocomplete="off"
/>
```

```javascript
// In your API route
if (body.website) {
  // Bot detected - silently succeed without sending
  return Response.json({ success: true });
}
```

### 6. Provide Meaningful Subjects

Include context in the subject line for easier inbox management:

```javascript
subject: `[Contact Form] New message from ${name}`,
// or
subject: `Quote Request: ${serviceType} - ${companyName}`,
```

### 7. Handle Errors Gracefully

Show user-friendly messages, log details for debugging:

```javascript
try {
  const result = await sendToMailer(formData);
  return { success: true };
} catch (error) {
  // Log full error for debugging
  console.error('Mailer error:', {
    error: error.message,
    formData: { ...formData, email: '[redacted]' },
  });
  
  // Return user-friendly message
  return {
    success: false,
    error: 'Unable to send your message. Please try again or email us directly.',
  };
}
```

### 8. Consider CAPTCHA for Public Forms

For high-traffic public forms, add reCAPTCHA, hCaptcha, or Turnstile:

```javascript
// Verify CAPTCHA before sending
const captchaResponse = await fetch(
  'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET,
      response: body.turnstileToken,
    }),
  }
);

const captchaResult = await captchaResponse.json();
if (!captchaResult.success) {
  return Response.json({ error: 'CAPTCHA verification failed' }, { status: 400 });
}
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| "Direct browser requests not allowed" | Calling from frontend JS | Route through your API |
| "Invalid or missing API key" | Wrong/missing `X-API-Key` header | Check environment variable |
| "Domain not in whitelist" | `domain` field not approved | Request domain to be added |
| "Validation failed" | Missing or invalid fields | Check `details` array in response |

---

## Need Help?

If you need a new domain whitelisted or have questions, contact the platform team.