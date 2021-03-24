import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

// Routes
import { userRouter } from './routes/users';

// Middleware
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

// Constants
const port = 3000;

const app = express();

// Configs
app.use(json());

// Routes
app.use('/api/users', userRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Authentication service listening on port: ${port}`);
});