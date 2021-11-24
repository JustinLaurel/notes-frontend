import React, { useState } from 'react';

export const useField = (type: string, initial = '') => {
    const [value, setValue] = useState(initial);
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
        }
    };
    
    const clear = () => {
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