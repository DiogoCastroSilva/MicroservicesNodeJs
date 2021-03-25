import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import User from '../models/user';
import { Password } from '../services/password';

const router = Router();

// GET
router.get('/currentuser', async (req, res) => {
    const { session } = req;
    if (!session || !session.jwt) {
        return res.send({ currentUser: null });
    }

    try {
        const payload = jwt.verify(
            session.jwt,
            process.env.JWT_PRIVATE_KEY as string
        );

        return res.send({ currentUser: payload });
    } catch (err) {
        return res.send({ currentUser: null });
    }

});


// POST
router.post('/signup',
    [
        body('email')
            .isEmail()
            .withMessage('E-mail must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = await User.create({
            email,
            password
        });

        console.log('User created', user.email);
        console.log('User sign in', user.email);

        // Generate JWT
        const userJWT = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_PRIVATE_KEY as string
        );

        // Add JWT to session header
        req.session = {
            jwt: userJWT
        };

        res.status(201).send(user);
    }
);

router.post('/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new BadRequestError('Invalid credentials');
        }

        const isPasswordAMatch = await Password.compare(user.password, password);

        if (!isPasswordAMatch) {
            throw new BadRequestError('Invalid credentials');
        }

          // Generate JWT
          const userJWT = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_PRIVATE_KEY as string
        );

        console.log('User sign in', user.email);

        // Add JWT to session header
        req.session = {
            jwt: userJWT
        };

        res.status(200).send(user);
    }
);

router.post('/signout', (req, res) => {
    req.session = null;

    res.send({});
});


export { router as userRouter };