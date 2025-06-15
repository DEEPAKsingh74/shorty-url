import { LoginData, LoginResponse } from "@/types/auth";
import { useApiMutation } from "../network/useApiMutation";
import { LOGIN } from "@/network/endpoints/auth";
import toast from "react-hot-toast";
import { ErrorResponse } from "@/types/error_response";
import { AxiosError } from "axios";


export const useLogin = () => {
    const {
        mutate: login,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useApiMutation<LoginResponse, LoginData>({
        getRequestConfig: (payload) => ({
            url: LOGIN,
            method: 'post',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        }),
        options: {
            onSuccess: () => {
                toast.success("welcome back");
            },
            onError: (error: AxiosError) => {
                toast.error((error.response?.data as ErrorResponse).error.message);
            },
        },
    });

    return {
        login,
        data,
        isPending,
        isError,
        error,
        reset,
    };
};