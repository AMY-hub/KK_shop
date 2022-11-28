/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLayoutEffect, useState } from 'react';

type UseMathMedia = (query: string) => boolean;

export const useMathMedia: UseMathMedia = (query: string) => {

    const [match, setMath] = useState<boolean>(false);

    if (typeof window === 'undefined') {
        return false;
    }

    const matchObj = matchMedia(query);

    function handleMatch() {
        setMath(matchObj.matches);
    }

    useLayoutEffect(() => {
        handleMatch();
        matchObj.addEventListener('change', handleMatch);
        return () => {
            matchObj.removeEventListener('change', handleMatch);
        };
    }, [query]);

    return match;
};