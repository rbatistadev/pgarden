'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/core/services/auth.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/modules/ui/components/button';

interface ILoginForm {
  email: string;
  password: string;
}
type LoginSource = 'google' | 'microsoft' | 'email';
interface ILogin {
  data: ILoginForm;
  source: LoginSource;
}

export const LoginForm = () => {
  const router = useRouter();
  const authService = new AuthService();
  const { register, handleSubmit } = useForm<ILoginForm>();
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<ILogin> = async props => {
    const { data, source } = props;

    if (source === 'email') {
      try {
        const { token } = await authService.login({ email: data.email, password: data.password });

        localStorage.setItem('token', token); // 🔐 Guardamos el token

        router.push('/dashboard');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Error al iniciar sesión';
        setError(message);
      }
    }
  };

  return (
    <>
      <form className="w-full max-w-sm space-y-4 flex flex-col items-center">
        <p>Login to your account</p>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="block w-full border border-[var(--primary-300)] rounded p-2 focus:outline-none focus:border-[var(--primary-500)]"
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className="block w-full border border-[var(--primary-300)] rounded p-2 focus:outline-none focus:border-[var(--primary-500)]"
        />
        <Button
          onClick={handleSubmit(data =>
            onSubmit({
              data,
              source: 'email',
            }),
          )}
          className="relative w-full justify-center"
        >
          Login with Email
        </Button>
        <Button
          onClick={handleSubmit(data =>
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
          onClick={handleSubmit(data =>
            onSubmit({
              data,
              source: 'microsoft',
            }),
          )}
          className="relative w-full justify-center"
          variant="secondary"
        >
          Continue with Microsoft
        </Button>
      </form>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </>
  );
};
