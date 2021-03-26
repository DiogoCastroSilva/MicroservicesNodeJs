import request from 'supertest';

import { app } from '../../app';
import { getSetCookie, signin } from '../../test/helpers/auth';


// Const
const baseURI = '/api/users';
const email = 'test@test.com';
const password = 'password';



describe('Signup tests', () => {
    it('should return a 201 on successful signup', async () => {
        return signin(email, password);
    });

    it('should return a 400 status code with invalid email', async () => {
        return signin('aa.com', password, 400);
    });

    it('should return a 400 status code with invalid password', async () => {
        return signin(email, 'a', 400);
    });

    it('should not allow duplicate emails', async () => {
        await signin(email, password);

        await signin(email, password, 400);
    });

    it('should set a cookie after successfully signup', async () => {
        const response = await signin(email, password)

        const cookie = getSetCookie(response);
        expect(cookie[0]).not.toContain('express:sess=;');
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
        await signin(email, password);

        await request(app)
            .post(`${baseURI}/signin`)
            .send({
                email,
                password: 'wrong password'
            })
            .expect(400);
    });

    it('should signin successfully and return a correct cookie', async () => {
        await signin(email, password);

        const response = await request(app)
            .post(`${baseURI}/signin`)
            .send({
                email,
                password
            })
            .expect(200);

        const cookie = getSetCookie(response);
        expect(cookie[0]).not.toContain('express:sess=;');
    });
});

describe('Signout tests', () => {
    it('should clears the cookie when signing out', async () => {
        // When singing up the user is also signed in
        await signin(email, password);

        const response = await request(app)
            .post(`${baseURI}/signout`)
            .send()
            .expect(200);

        const cookie = getSetCookie(response);
        expect(cookie[0]).toContain('express:sess=;');
    });
});

describe('CurrentUser tests', () => {
    it('should have details with the current user', async () => {
        // When singing up the user is also signed in
        const response = await signin(email, password);

        const cookie = getSetCookie(response);
        expect(cookie[0]).not.toContain('express:sess=;');

        const currentUserResponse = await request(app)
            .get(`${baseURI}/currentuser`)
            .set('Cookie', cookie)
            .send()
            .expect(200);

        const currentUser = currentUserResponse.body.currentUser;

        expect(currentUser.email).toEqual(email);
        expect(currentUser.id).toBeDefined();
    });

    it('should have details with the current user', async () => {
        const currentUserResponse = await request(app)
            .get(`${baseURI}/currentuser`)
            .send()
            .expect(200);

        const currentUser = currentUserResponse.body.currentUser;
        expect(currentUser).toBeNull();
    });
});