import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { app } from '../app';

// Mongo server for tests
let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.PORT = '3000';
    process.env.NODE_ENV = 'development';
    process.env.JWT_PRIVATE_KEY = 'test-secret';

    mongo = new MongoMemoryServer();
    const mongoURI = await mongo.getUri();

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});


beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});


afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});