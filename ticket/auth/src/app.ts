import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

// Routes
import { userRouter } from './routes/users';

// Middlewares
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';



const app = express();

// Configs
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    // Disable encryption
    signed: false
}));

// Routes
app.use('/api/users', userRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };