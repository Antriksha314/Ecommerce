import bcrypt from 'bcrypt';

export const GenerateHashPassword = async (password) => {
    try {
        
        const hashPassword = await bcrypt.hash(password, 10);

        return hashPassword;

    } catch (error) {

        return error;

    }
}

export const ComparePassword = async (password, hashPassword) => {
    try {

        const isPasswordMatch = await bcrypt.compare(password, hashPassword);

        return isPasswordMatch;

    } catch (error) {

        return error;

    }
}