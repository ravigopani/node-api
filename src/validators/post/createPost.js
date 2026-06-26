import { z } from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    rating: z.number().int('Rating must be an integer').min(1).max(5),
});