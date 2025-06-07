export type UserData = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export type UserResponse = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
}