import dotenv from 'dotenv';
import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import mongoose from 'mongoose'

// Routes
import { userRouter } from './routes/users';

// Middleware
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { DatabaseConnectionError } from './errors/database-connection-error';

// Constants
dotenv.config();
const port = process.env.port;

const app = express();

// Configs
app.use(json());

// Routes
app.use('/api/users', userRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);


// Start db connection
const startDB = async() => {
    try {
        await mongoose.connect(`${process.env.DB_CONNECTION}/${process.env.DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        throw new DatabaseConnectionError();
    }

    // Start server
    app.listen(port, () => {
        console.log(`Authentication service listening on port: ${port}`);
    });
};


startDB();