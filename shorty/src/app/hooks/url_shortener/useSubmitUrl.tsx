import { useApiMutation } from "../network/useApiMutation";
import { SHORT_URL } from "@/network/endpoints/url";
import { ShortUrlData, ShortUrlResponse } from "@/types/url";


export const useSubmitUrl = () => {
    const {
        mutate: shortUrl,
        data,
        isPending,
        isError,
        error,
        reset,
    } = useApiMutation<ShortUrlResponse, ShortUrlData>({
        getRequestConfig: () => ({
            url: SHORT_URL,
            method: 'post',
        }),
        options: {
            onSuccess: (data) => {
                console.log('url shortened successful:', data);
            },
            onError: (error) => {
                console.error('url shortened error:', error);
            },
        },
    });

    return {
        shortUrl,
        data,
        isPending,
        isError,
        error,
        reset,
    };
};