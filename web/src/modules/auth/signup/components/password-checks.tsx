'use client';

import { CheckIcon } from 'lucide-react';

interface PasswordChecksProps {
  password: string | null;
}

const PASSWORD_REGEX = {
  UPPER_AND_LOWER: /^(?=.*[A-Z])(?=.*[a-z])/,
  NUMBER: /\d/,
};

const ValidationIcon = ({ state }: { state: boolean }) =>
  state ? (
    <CheckIcon className="h-5 w-5" />
  ) : (
    <span className="flex h-5 w-5 items-center justify-center">
      <i className="inline-block h-2 w-2 rounded-full bg-slate-700" />
    </span>
  );

export const PasswordChecks = ({ password }: PasswordChecksProps) => {
  const DEFAULT_VALIDATIONS = [
    { label: 'Mix of uppercase and lowercase', state: false },
    {
      label: 'Minimum 8 & Maximum 128 characters',
      state: false,
    },
    { label: 'Contain at least 1 number', state: false },
  ];

  const validations = () => {
    if (password === null) return DEFAULT_VALIDATIONS;

    return [
      {
        label: 'Mix of uppercase and lowercase',
        state: PASSWORD_REGEX.UPPER_AND_LOWER.test(password),
      },
      {
        label: 'Minimum 8 & Maximum 128 characters',
        state: password.length >= 8 && password.length <= 128,
      },
      {
        label: 'Contain at least 1 number',
        state: PASSWORD_REGEX.NUMBER.test(password),
      },
    ];
  };

  return (
    <div className="my-2 text-left text-slate-700 sm:text-sm">
      <ul role="list" aria-label="Password requirements">
        {validations().map(validation => (
          <li key={validation.label} className="flex items-center">
            <ValidationIcon state={validation.state} />
            {validation.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
