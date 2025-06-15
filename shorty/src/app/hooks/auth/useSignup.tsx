import { SignupData, SignupResponse } from "@/types/auth";
import { useApiMutation } from "../network/useApiMutation";
import { SIGNUP } from "@/network/endpoints/auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/error_response";


export const useSignup = () => {
    const {
        mutate: signup,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useApiMutation<SignupResponse, SignupData>({

        getRequestConfig: (payload) => ({
            url: SIGNUP,
            method: 'post',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        }),
        options: {
            onSuccess: () => {
                toast.success("registered successfully")
            },
            onError: (error: AxiosError) => {

                toast.error((error.response?.data as ErrorResponse).error.message);
            },
        },
    });

    return {
        signup,
        data,
        isPending,
        isError,
        error,
        reset,
    };
};