# Hope International Academy

Next.js, TypeScript, and Tailwind CSS frontend for Hope International Academy.

## Requirements

- Node.js 18.17 or newer
- npm

## Commands

```bash
npm install
npm run dev
npm run build
npm run type-check
```

The development server runs at `http://localhost:3000` by default.

## Firebase

The forms submit to Firestore through the Firebase web SDK. The current public Firebase
configuration is included as a fallback to preserve existing behavior. For deployments,
prefer setting the `NEXT_PUBLIC_FIREBASE_*` values in `.env.local`.
