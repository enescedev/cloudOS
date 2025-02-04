'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BashPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/?terminal=open');
  }, [router]);

  return null;
}
