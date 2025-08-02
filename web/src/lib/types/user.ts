import { z } from 'zod';

export const ZUserName = z
  .string()
  .trim()
  .min(1, { message: 'Name should be at least 1 character long' })
  .regex(/^[\p{L}\p{M}\s'\d-]+$/u, 'Invalid name format');

export const ZUserPassword = z
  .string()
  .min(8)
  .max(128, { message: 'Password must be 128 characters or less' })
  .regex(/^(?=.*[A-Z])(?=.*\d).*$/);
