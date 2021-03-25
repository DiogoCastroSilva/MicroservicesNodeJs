import dotenv from 'dotenv';
import mongoose from 'mongoose'
import { DatabaseConnectionError } from './errors/database-connection-error';

import { app } from './app';


// Constants
dotenv.config();
const port = process.env.PORT;


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