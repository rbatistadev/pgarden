'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/modules/ui/components/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FormControl, FormError, FormField, FormItem } from '@/modules/ui/components/form';
import { PasswordInput } from '@/modules/ui/components/input/password';
import Link from 'next/dist/client/link';
import { authService } from '../../services';
import { useAuthStore } from '@/lib/store/auth.store';
import { AxiosError } from 'axios';

const ZLoginForm = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  totpCode: z.string().optional(),
  backupCode: z.string().optional(),
});

type TLoginForm = z.infer<typeof ZLoginForm>;

export const LoginForm = () => {
  const { setLoginData } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showLogin, setShowLogin] = useState(false);

  const form = useForm<TLoginForm>({
    defaultValues: {
      email: searchParams?.get('email') ?? '',
      password: '',
      totpCode: '',
      backupCode: '',
    },
    resolver: zodResolver(ZLoginForm),
  });

  const onSubmit: SubmitHandler<TLoginForm> = async data => {
    try {
      const signInResponse = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (signInResponse?.error) {
        toast.error(JSON.stringify(signInResponse.error));
        return;
      }

      if (signInResponse?.token) {
        setLoginData({
          token: signInResponse.token,
          refreshToken: signInResponse.refreshToken,
        });
        router.push('/dashboard');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'An error occurred during login.');
      }
    }
  };

  return (
    <FormProvider {...form}>
      <div className="text-center">
        <h1 className="mb-4 text-slate-700">Login to your account</h1>
        <div className="space-y-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {showLogin && (
              <div className={'space-y-2'}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div>
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={field.value}
                            onChange={email => field.onChange(email)}
                            placeholder="work@email.com"
                            className="focus:border-brand-dark focus:ring-brand-dark block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                          />
                          {error?.message && (
                            <FormError className="text-left">{error.message}</FormError>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div>
                          <PasswordInput
                            id="password"
                            autoComplete="current-password"
                            placeholder="*******"
                            aria-placeholder="password"
                            aria-label="password"
                            aria-required="true"
                            required
                            className="focus:border-brand-dark focus:ring-brand-dark block w-full rounded-md border-slate-300 pr-8 shadow-sm sm:text-sm"
                            value={field.value}
                            onChange={password => field.onChange(password)}
                          />
                          {error?.message && (
                            <FormError className="text-left">{error.message}</FormError>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="ml-1 text-right transition-all duration-500 ease-in-out">
                  <Link
                    href="/auth/forgot-password"
                    className="hover:text-brand-dark text-xs text-slate-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            )}
            <Button
              onClick={() => {
                if (!showLogin) {
                  setShowLogin(true);
                  // Add a slight delay before focusing the input field to ensure it's visible
                  setTimeout(() => emailRef.current?.focus(), 100);
                } else if (formRef.current) {
                  formRef.current.requestSubmit();
                }
              }}
              className="relative w-full justify-center"
              loading={form.formState.isSubmitting}
            >
              Login with Email
            </Button>
            {/* TODO : ADD OTHER LOGIN OPTIONS */}
            {/* <Button
              onClick={form.handleSubmit(data =>
                onSubmit({
                  data,
                  source: 'google',
                }),
              )}
              className="relative w-full justify-center"
              variant="secondary"
            >
              Continue with Google
            </Button>
            <Button
              onClick={form.handleSubmit(data =>
                onSubmit({
                  data,
                  source: 'microsoft',
                }),
              )}
              className="relative w-full justify-center"
              variant="secondary"
            >
              Continue with Microsoft
            </Button> */}
          </form>
        </div>

        <div className="mt-9 text-center text-xs">
          <span className="leading-5 text-slate-500">New to People Garden HR?</span>
          <br />
          <Link
            href="/auth/signup"
            className="font-semibold text-slate-600 underline hover:text-slate-700"
          >
            Create an account
          </Link>
        </div>
      </div>
    </FormProvider>
  );
};
