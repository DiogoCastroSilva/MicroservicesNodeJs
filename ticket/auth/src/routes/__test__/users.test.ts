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
        expect(response.get('Set-Cookie')[0]).not.toContain('express:sess=;');
    });
});

describe('Signin tests', () => {
    it('should fail when a email that doesn\'t exists is supplied', async () => {
        return request(app)
            .post(`${baseURI}/signin`)
            .send({
                email,
                password
            })
            .expect(400);
    });

    it('should fail when an incorrect password is supplied', async () => {
        await request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(201);

        await request(app)
            .post(`${baseURI}/signin`)
            .send({
                email,
                password: 'wrong password'
            })
            .expect(400);
    });

    it('should signin successfully and return a correct cookie', async () => {
        await request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(201);

        const response = await request(app)
            .post(`${baseURI}/signin`)
            .send({
                email,
                password
            })
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
        expect(response.get('Set-Cookie')[0]).not.toContain('express:sess=;');
    });
});

describe('Signout tests', () => {
    it('should clears the cookie when signing out', async () => {
        // When singing up the user is also signed in
        await request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(201);

        const response = await request(app)
            .post(`${baseURI}/signout`)
            .send()
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
        expect(response.get('Set-Cookie')[0]).toContain('express:sess=;');
    });
});