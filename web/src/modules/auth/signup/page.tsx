import { Metadata } from 'next';
import { FormWrapper } from '../components/form-wrapper';
import { SignupForm } from './components/signup.form';

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Open-source Experience Management. Free & open source.',
};

export const SignupPage = () => {
  return (
    <div className="grid min-h-screen w-full bg-gradient-to-tr from-slate-100 ">
      <div className="col-span-3 flex flex-col items-center justify-center">
        <FormWrapper>
          <SignupForm />
        </FormWrapper>
      </div>
    </div>
  );
};
