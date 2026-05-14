// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

import { prisma } from '../src/config/db.js';

const authorId = 1;

const posts = [
    {
        title: 'Post 1',
        description: 'Post 1 description',
        rating: 5,
        authorId
    },
    {
        title: 'Post 2',
        description: 'Post 2 description',
        rating: 4,
        authorId
    },
    {
        title: 'Post 3',
        description: 'Post 3 description',
        rating: 3,
        authorId
    },
    {
        title: 'Post 4',
        description: 'Post 4 description',
        rating: 2,
        authorId
    },
    {
        title: 'Post 5',
        description: 'Post 5 description',
        rating: 1,
        authorId
    }
]

async function main() {
    for (const post of posts) {
        await prisma.post.create({
            data: post
        });
    }
    // await prisma.post.createMany({
    //     data: posts
    // });
}

main().catch(console.error).finally(async () => {
    await prisma.$disconnect();
});