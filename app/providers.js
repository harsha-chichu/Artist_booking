'use client';
import ClientToaster from './client-toaster';

export default function Providers({ children }) {
  return (
    <>
      <ClientToaster />
      {children}
    </>
  );
}
