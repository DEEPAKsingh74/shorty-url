export interface SignupData {
    full_name: string;
    email: string;
    password: string;
}


// @ts-ignore
export interface SignupResponse {
    success: boolean,
    message: string;
    data: unknown
}

export interface LoginData {
    email: string;
    password: string;
}



// @ts-ignore
export interface LoginResponse {
    success: boolean,
    message: string;
    data: unknown
}