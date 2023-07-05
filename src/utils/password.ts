import { compare, hash } from 'bcrypt';

export const createHashedPassword = async (password: string) => {
    return await hash(password, 10);
};

export const compareHashedPassword = async (
    password: string,
    hashedPassword: string,
) => {
    return await compare(password, hashedPassword);
};
