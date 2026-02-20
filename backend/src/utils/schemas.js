import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    referralCode: z.string().optional()
  })
});

export const loginSchema = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(6) })
});

export const swapSchema = z.object({
  body: z
    .object({
      toUser: z.string(),
      offeredSkill: z.string().optional(),
      requestedSkill: z.string().optional(),
      offeredBundleId: z.string().optional(),
      requestedBundleId: z.string().optional(),
      hoursOffered: z.number().min(1),
      milestones: z.array(z.object({ text: z.string(), done: z.boolean().optional() })).optional(),
      clientRequestId: z.string().optional(),
      message: z.string().optional()
    })
    .refine((v) => !!(v.offeredSkill || v.offeredBundleId), 'Provide offeredSkill or offeredBundleId')
    .refine((v) => !!(v.requestedSkill || v.requestedBundleId), 'Provide requestedSkill or requestedBundleId')
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
