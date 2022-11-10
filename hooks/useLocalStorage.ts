import { useEffect, useState } from 'react';

type UseLS = <T>(key: string, initialValue: T) => [
    data: T | null,
    setData: (newData: T | null) => void
];

export const useLocalStorage: UseLS = (key, initialValue) => {

    const [data, setData] = useState<typeof initialValue | null>(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data, key]);


    function getValue(): typeof initialValue | null {
        if (typeof window === "undefined") {
            return null;
        }

        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        } else {
            return initialValue;
        }
    }

    return [data, setData];
};