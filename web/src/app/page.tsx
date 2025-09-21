'use client';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Root() {
  const router = useRouter();
  const { loginData } = useAuthStore();

  useEffect(() => {
    if (!loginData) {
      router.push('/auth/login');
      return;
    }

    router.push('/dashboard');
  }, [loginData, router]);

  return <></>;
}
