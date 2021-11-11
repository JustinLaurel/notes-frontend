import React, { useState } from 'react';

export const useField = (type: string) => {
    const [value, setValue] = useState('');
    const onChange = 
        (event: React.FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    const clearField = () => setValue('');

    return {
        type,
        value,
        onChange,
        clearField
    };
};

export const useTimeout = () => {
    let timeoutId: null | NodeJS.Timeout = null;
    // const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

    const set = (func: unknown, timeout: number) => {
        if (func instanceof Function) {
            const id = setTimeout(func, timeout) as unknown as NodeJS.Timeout;
            timeoutId = id;
            console.log(`setTimeout called, timeoutId=${timeoutId}`);
        }
    };
    
    const clear = () => {
        console.log(`useTimeout.clear called, timeoutId=${timeoutId}`);
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return {
        set,
        clear
    };
};