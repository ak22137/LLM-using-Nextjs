# Setup Guide for ChatGPT Mobile Clone (Next.js)

## Prerequisites
- Node.js 18+
- npm
- Supabase account (https://supabase.com/)
- Auth0 account (https://auth0.com/)
- Google Gemini API key (https://ai.google.dev/gemini-api/docs/pricing)

## 1. Install dependencies
```
npm install
```

## 2. Configure environment variables
Create a `.env.local` file in the project root:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_AUTH0_DOMAIN=your_auth0_domain
NEXT_PUBLIC_AUTH0_CLIENT_ID=your_auth0_client_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## 3. Run the development server
```
npm run dev
```

## 4. Deploy
- Deploy to Vercel (recommended): https://vercel.com/import/project
- Or Render: https://render.com/

## 5. Testing
```
npm test
```

## 6. Notes
- Only mobile view is supported.
- Update README.md with your deployed app link (no extra text).
- Record a demo video (Loom/YouTube) and share the link as instructed.
