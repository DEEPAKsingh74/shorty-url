import bcrypt from "bcryptjs";

/**
 * Hashes a plain-text password using bcrypt.
 * @param password - The plain-text password to hash.
 * @returns The hashed password as a string.
 */
export const hashString = async (password: string): Promise<string> => {
    const saltRounds = 12;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
};


export const compareHash = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};