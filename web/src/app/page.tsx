'use client';
import { useAuth } from '@/lib/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Root() {
  const router = useRouter();
  const { loginData } = useAuth();

  useEffect(() => {
    if (!loginData) {
      router.push('/auth/login');
      return;
    }

    router.push('/dashboard');
  }, [loginData, router]);

  return <></>;
}
