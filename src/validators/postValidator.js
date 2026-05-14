import { z } from 'zod';

const createPostSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    rating: z.number().int('Rating must be an integer').min(1).max(5),
});

export const validateCreatePost = (req, res, next) => {
    const { error } = createPostSchema.safeParse(req.body);
    if (error) {
        console.log('=======================================', error.message);
        return;
        // return res.status(400).json({ message: error.errors.map(err => err.message).join(', ') });
    }
    next();
}