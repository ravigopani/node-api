import 'dotenv/config';
import express from 'express';

// Prisma `BigInt` ids serialize in JSON responses (native JSON.stringify cannot encode BigInt).
BigInt.prototype.toJSON = function () {
    return this.toString();
};

import { connectDB, disconnectDB } from './src/config/db.js';

import authRoutes from './src/routes/authRoutes.js';
import postsRoute from './src/routes/postsRoute.js';


const app = express();
const PORT = process.env.PORT || 5002;

async function start() {
    await connectDB();

    // Parse JSON bodies
    app.use(express.json());
    // Parse URL-encoded bodies
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.get('/test', (req, res) => {
        res.send('Test API is working');
        // res.json({ message: 'Hello World' });
    });

    app.use('/auth', authRoutes);
    app.use('/posts', postsRoute);

    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    server.on('error', (error) => {
        console.error('Server error:', error);
    });

    server.on('listening', () => {
        console.log(`Server is running on port ${PORT}`);
    });

    const shutdown = async () => {
        server.close();
        await disconnectDB();
        process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
