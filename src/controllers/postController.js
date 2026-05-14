import { prisma } from '../config/db.js';

export const getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });
    return res.json({ message: 'All posts', posts });
};

export const createPost = async (req, res) => {
    const { title, description, rating } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            description,
            rating,
            authorId: req.user.id,
        },
    });

    return res.json({ message: 'Post created', post });
};

export const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: BigInt(id) },
    });
    return res.json({ message: 'Post found', post });
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description, rating } = req.body;
    const post = await prisma.post.update({
        where: { id: BigInt(id) },
        data: { title, description, rating },
    });
    return res.json({ message: 'Post updated', post });
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.delete({
        where: { id: BigInt(id) },
    });
    return res.json({ message: 'Post deleted', post });
};