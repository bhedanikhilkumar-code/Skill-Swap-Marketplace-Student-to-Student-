import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) })
});

export const loginSchema = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(6) })
});

export const swapSchema = z.object({
  body: z.object({
    toUser: z.string(),
    offeredSkill: z.string(),
    requestedSkill: z.string(),
    hoursOffered: z.number().min(1),
    message: z.string().optional()
  })
});

export const sessionSchema = z.object({
  body: z.object({
    swapId: z.string(),
    scheduledAt: z.string(),
    durationMinutes: z.number().min(15),
    mode: z.enum(['online', 'offline']),
    notes: z.string().optional()
  })
});
