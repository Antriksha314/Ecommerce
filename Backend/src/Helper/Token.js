import jwt from 'jsonwebtoken';
const Secret_Key = process.env.JWT_SECRET;

export const GenerateToken = (payload) => {
    try {

        const token = jwt.sign(payload, Secret_Key);

        return token;

    } catch (error) {

        return error;

    }
}

export const VerifyToken = (token) => {
    try {

        const payload = jwt.verify(token, Secret_Key);

        return payload;

    } catch (error) {

        return error;

    }
}