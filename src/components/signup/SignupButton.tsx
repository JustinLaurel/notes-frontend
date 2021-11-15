import { Button } from '@chakra-ui/react';

interface VisibilityToggler {
    toggleVisibility: () => void 
}
const SignupButton = ({ toggleVisibility }: VisibilityToggler) => {
    const handleToggle = (e: React.FormEvent) => {
        e.preventDefault();
        toggleVisibility();
    };

    const buttonStyle = {
        "size": "xs",
        "bgColor": "green.300"
    };

    return (
        <Button {...buttonStyle} onClick={handleToggle}>sign up</Button>
    );
};

export default SignupButton;