import request from 'supertest';

import { app } from '../../app';


// Const
const baseURI = '/api/users';
const email = 'test@test.com';
const password = 'password';



describe('Signup tests', () => {
    it('should return a 201 on successful signup', async () => {
        return request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(201);
    });

    it('should return a 400 status code with invalid email', async () => {
        return request(app)
            .post(`${baseURI}/signup`)
            .send({
                email: 'aa.com',
                password
            })
            .expect(400);
    });

    it('should return a 400 status code with invalid password', async () => {
        return request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password: 'as'
            })
            .expect(400);
    });

    it('should not allow duplicate emails', async () => {
        await request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(201);

        await request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(400);
    });

    it('should set a cookie after successfully signup', async () => {
        const response = await request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});