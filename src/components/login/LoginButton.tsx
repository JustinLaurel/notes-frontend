import React from 'react';

interface VisibilityToggler {
    toggleVisibility: () => void 
}
const LoginButton = ({ toggleVisibility }: VisibilityToggler) => {
    const handleToggle = (e: React.FormEvent) => {
        e.preventDefault();
        toggleVisibility();
    };

    return (
        <button onClick={handleToggle}>login</button>
    );
};

export default LoginButton;