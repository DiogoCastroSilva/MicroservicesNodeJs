import request, { Response } from 'supertest';

import { app } from '../../app';


export const baseURI = '/api/users';


export const signin = async (
    email: string,
    password: string,
    status: number = 201
): Promise<Response> => {
    return await request(app)
            .post(`${baseURI}/signup`)
            .send({
                email,
                password
            })
            .expect(status);
};


export const getSetCookie = (response: Response): string[] => {
    const cookie = response.get('Set-Cookie');

    expect(cookie).toBeDefined();

    return cookie;
};