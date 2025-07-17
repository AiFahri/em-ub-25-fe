// app/google/callback/page.tsx
import { Suspense } from 'react';
import GoogleCallbackClient from './GoogleCallbackClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading Google login...</div>}>
      <GoogleCallbackClient />
    </Suspense>
  );
}
