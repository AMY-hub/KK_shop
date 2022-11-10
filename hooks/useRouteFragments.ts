import { useRouter } from 'next/router';

export const useRouteFragments = (): string[] => {
    const router = useRouter();

    const path = router.asPath.split('?')[0];
    return path.split('/').filter(el => el.length > 0);
};