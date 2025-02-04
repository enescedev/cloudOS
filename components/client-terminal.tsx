'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import XtermBash with no SSR
const XtermBash = dynamic(() => import('./xtermBash'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-[#1E1E1E] rounded-sm overflow-hidden flex items-center justify-center">
      <div className="text-gray-400">Loading terminal...</div>
    </div>
  ),
});

export function ClientTerminal({ containerId }: { containerId?: string }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full min-h-[300px] bg-[#1E1E1E] rounded-sm overflow-hidden flex items-center justify-center">
          <div className="text-gray-400">Loading terminal...</div>
        </div>
      }
    >
      <XtermBash containerId={containerId} />
    </Suspense>
  );
}
