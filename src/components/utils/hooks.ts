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

export interface Field {
    type: string,
    value: string,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void,
    clearField: () => void
}