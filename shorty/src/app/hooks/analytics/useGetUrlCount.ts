import { useApiQuery } from '../network/useApiQuery';

export function useUrlCountQuery({
    key = ["urls count"],
    enabled = false,
}: {
    key?: readonly unknown[];
    enabled?: boolean;
}) {

    // @ts-ignore
    return useApiQuery<{message: string, success: boolean, data: any}>({
        key,
        url: '/analytic/count',
        enabled,
    });
}
