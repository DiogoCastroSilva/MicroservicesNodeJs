import { Schema, model, Document } from 'mongoose';
import { Password } from '../services/password';

export interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword);
    }

    done();
});

export default model<IUser>('User', userSchema);