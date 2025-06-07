import { useApiQuery } from '../network/useApiQuery';

export function useGetUrlsQuery({
    key = ["all urls analytics"],
    enabled = false,
}: {
    key?: readonly unknown[];
    enabled?: boolean;
}) {

    // @ts-ignore
    return useApiQuery<{ message: string, success: boolean, data: any }>({
        key,
        url: `/analytic`,
        enabled,
    });
}
