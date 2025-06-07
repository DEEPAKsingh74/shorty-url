import { LoginResponse } from "@/types/auth";
import { useApiMutation } from "../network/useApiMutation";
import toast from "react-hot-toast";
import { ErrorResponse } from "@/types/error_response";
import { AxiosError } from "axios";


export const useDeleteUrl = () => {
    const {
        mutate: deleteUrl,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useApiMutation<void, string>({
        getRequestConfig: (id) => ({
            url: `/url/${id}`,
            method: 'delete',
        }),
        options: {
            onSuccess: () => {
                toast.success("URL deleted");
            },
            onError: (error: AxiosError) => {
                toast.error((error.response?.data as ErrorResponse)?.error?.message || "Delete failed");
            },
        },
    });

    return {
        deleteUrl,
        data,
        isPending,
        isError,
        error,
        reset,
    };
};
