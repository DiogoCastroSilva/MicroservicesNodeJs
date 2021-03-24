import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import User from '../models/user';

const router = Router();

// GET
router.get('/currentuser', (req, res) => {

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Email in use');
            return res.send({});
        }

        const user = await User.create({
            email,
            password
        });

        console.log('User created');

        res.status(201).send(user);
    });

router.post('/signin', (req, res) => {

});

router.post('/signout', (req, res) => {

});


export { router as userRouter };