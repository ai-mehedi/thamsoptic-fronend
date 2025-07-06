'use client';

import React, { useEffect } from 'react';

export default function GoCardlessPayButton() {
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.origin) return;

      if (event.data.status === 'success') {
        alert('Payment completed successfully!');
        // Reload or update UI here if needed
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  async function startPayment() {
    try {
      const res = await fetch('/api/gocardless/create-redirect-flow', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        alert('Failed to start payment: ' + JSON.stringify(data));
        return;
      }

      const popup = window.open(data.redirectUrl, 'GoCardlessPayment', 'width=600,height=700');

      if (!popup) {
        alert('Please enable popups for this site');
      }
    } catch (err) {
      alert('Error starting payment: ' + err);
    }
  }

  return (
    <button onClick={startPayment}  className="w-full py-6 text-base font-normal mt-6">
      Pay with GoCardless
    </button>
  );
}
