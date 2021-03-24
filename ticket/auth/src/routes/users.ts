import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new Error('Invalid email/password!');
        }

        const { email, password } = req.body;

        console.log('Creating a user...');

        res.send({});
    });

router.post('/signin', (req, res) => {

});

router.post('/signout', (req, res) => {

});


export { router as userRouter };