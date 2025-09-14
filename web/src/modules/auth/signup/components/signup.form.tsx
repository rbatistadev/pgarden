'use client';

import { ZUserName, ZUserPassword } from '@/lib/types/user';
import { FormControl, FormError, FormField, FormItem } from '@/modules/ui/components/form';
import { Input } from '@/modules/ui/components/input';
import { PasswordInput } from '@/modules/ui/components/input/password';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { z } from 'zod';
import { PasswordChecks } from './password-checks';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/modules/ui/components/button';
import { authService } from '../../services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ZSignupInput = z.object({
  name: ZUserName,
  email: z.email(),
  password: ZUserPassword,
});

type TSignupInput = z.infer<typeof ZSignupInput>;

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm<TSignupInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(ZSignupInput),
  });

  const handleSubmit = (data: TSignupInput) => {
    authService
      .signup({ ...data })
      .then(() => {
        toast.success('You have been successfully registered.');
        router.push('/auth/login');
      })
      .catch(err => {
        toast.error(err.toString());
      });
  };

  return (
    <div className="text-center">
      <h1 className="mb-4 text-slate-700">Create your PeopleGarden account</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <Input
                        data-testid="signup-name"
                        value={field.value}
                        name="name"
                        autoFocus
                        onChange={e => field.onChange(e.target.value)}
                        placeholder="Full name"
                        className="bg-white"
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
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div>
                      <Input
                        data-testid="signup-email"
                        value={field.value}
                        name="email"
                        onChange={e => field.onChange(e.target.value)}
                        placeholder="work@email.com"
                        className="bg-white"
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
                        data-testid="signup-password"
                        id="password"
                        name="password"
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                        autoComplete="current-password"
                        placeholder="*******"
                        aria-placeholder="password"
                        required
                        className="focus:border-brand-dark focus:ring-brand-dark block w-full rounded-md shadow-sm sm:text-sm"
                      />
                      {error?.message && (
                        <FormError className="text-left">{error.message}</FormError>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <PasswordChecks password={form.watch('password')} />
          <Button
            data-testid="signup-submit"
            type="submit"
            className="h-10 w-full justify-center"
            loading={form.formState.isSubmitting}
            disabled={!form.formState.isValid}
          >
            Continue with Email
          </Button>
        </form>
      </FormProvider>
      <div className="mt-9 text-center text-xs">
        <span className="leading-5 text-slate-500">Have an account?</span>
        <br />
        <Link
          href={'/auth/login'}
          className="font-semibold text-slate-600 underline hover:text-slate-700"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};
