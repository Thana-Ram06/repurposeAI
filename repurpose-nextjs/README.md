# RepurposeAI — Next.js Version

A premium AI content repurposing tool built with Next.js 15, Firebase, and OpenAI.

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in your keys
2. Run `npm install`
3. Run `npm run dev`

## Vercel Deployment

1. Import this repo into Vercel
2. Set **Root Directory** to `repurpose-nextjs`
3. Add all environment variables from `.env.local.example`
4. Deploy

## Environment Variables

| Variable | Where to get it |
|----------|----------------|
| `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Console → Project Settings → Your Apps → Web App |
