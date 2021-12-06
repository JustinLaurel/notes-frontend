import { Button } from '@chakra-ui/react';
import React from 'react';

interface VisibilityToggler {
    toggleVisibility: () => void 
}
const LoginButton = ({ toggleVisibility }: VisibilityToggler) => {

    const handleToggle = (e: React.FormEvent) => {
        e.preventDefault();
        toggleVisibility();
    };

    const buttonStyle = {
        "size": "xs",
        "bgColor": "blue.300"
    };

    return (
        <Button {...buttonStyle} onClick={handleToggle}>login</Button>
    );
};

export default LoginButton;