import { z } from 'zod';

const createPostSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    rating: z.number().int('Rating must be an integer').min(1).max(5),
});

export const validateCreatePost = (req, res, next) => {
    const result = createPostSchema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.length ? issue.path.join('.') : 'body',
            message: issue.message,
        }));
        return res.status(400).json({
            errors,
        });
    }
    next();
};