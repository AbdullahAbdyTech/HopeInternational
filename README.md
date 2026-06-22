# Hope International Tutor Academy

Next.js, TypeScript, and Tailwind CSS frontend for Hope International Tutor Academy.

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

## Meta Pixel and CAPI

Meta Pixel ID `1030696829380782` is installed globally. Server-side Conversions API
events are sent through `api/enrollment-lead.php`; configure `META_CAPI_ACCESS_TOKEN`
as a GitHub Actions repository secret or on the Hostinger server environment. The
deployment workflow generates `api/.capi-secrets.php` on Hostinger from that secret;
the file is ignored by Git and protected by `.htaccess`. Use `META_TEST_EVENT_CODE`
only while testing in Meta Events Manager.
