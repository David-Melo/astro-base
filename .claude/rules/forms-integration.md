---
alwaysApply: false
---

# Forms Integration Standards

Use this rule whenever implementing contact forms, quote request forms, or any frontend form that submits through the centralized mailer workflow.

## Purpose

This rule defines the architectural and implementation standards for forms so `dev_agent` can build them consistently without relying on a separate helper skill.

## Core Architecture

All browser form submissions must flow through your own server/API route first.

```text
Browser Form -> Your API Route -> Mailer Worker
```

Direct browser requests to the mailer are not allowed.

## Mailer Requirements

- Endpoint shape: `POST https://mailer.<your-domain>.workers.dev/send`
- Required authentication:
  - `X-API-Key` header
  - approved `domain` field in the request body

## Request Body

Preferred mode for normal website forms:

- use `fields` for structured form submissions
- set `replyTo` to the submitter's email when available
- generate meaningful subjects for inbox clarity

Important fields:

- `domain`
- `to`
- `subject`
- `fields` or `text`
- optional `html`
- optional `replyTo`, `cc`, `bcc`, `from`

## Frontend Form Standards

When building the frontend:

- also follow `.claude/rules/accessibility.md`
- use visible labels
- provide helper text where needed
- show understandable success and error states
- preserve keyboard accessibility and focus handling

## Server-Side Standards

- validate all required fields on the server
- never trust client input blindly
- return structured JSON success/error responses
- keep API keys in environment variables
- use rate limiting or bot protection where appropriate
- prefer honeypot or CAPTCHA protection for public forms

## Typical Implementation Pattern

1. Build accessible frontend form UI
2. Submit to your own API route
3. Validate request on the server
4. Forward to the mailer with the proper auth headers
5. Return user-safe responses to the frontend

## Common Form Types

- contact form
- quote request form
- consultation request form
- support form
- lead qualification form

## Best Practices

- Include context in the subject line
- Route high-priority forms to the correct inbox
- Redact sensitive details in logs when possible
- Handle failure gracefully with user-friendly messages
- Keep field naming clean and machine-readable

## When To Use This Rule

Use this rule whenever `dev_agent` is implementing forms, API routes, or lead routing behavior.
