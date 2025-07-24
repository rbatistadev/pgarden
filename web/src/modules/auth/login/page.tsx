import { FormWrapper } from '@/modules/auth/components/form-wrapper';
import { Metadata } from 'next';
import { LoginForm } from './components/login-form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Open-source Experience Management. Free & open source.',
};

export const LoginPage = async () => {
  return (
    <div className="col-span-3 flex flex-col items-center justify-center">
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </div>
  );
};
