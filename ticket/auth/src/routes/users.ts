import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

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
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        throw new DatabaseConnectionError();

        console.log('Creating a user...');

        res.send({});
    });

router.post('/signin', (req, res) => {

});

router.post('/signout', (req, res) => {

});


export { router as userRouter };