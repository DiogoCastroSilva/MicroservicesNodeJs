import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';


const scryptAsync = promisify(scrypt);


export class Password {
    private static async generateBuf(password: string, salt: string) {
        return (await scryptAsync(password, salt, 64) as Buffer).toString('hex');
    }

    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = await Password.generateBuf(password, salt);

        return `${buf}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = await Password.generateBuf(suppliedPassword, salt);

        return buf === hashedPassword;
    }
}