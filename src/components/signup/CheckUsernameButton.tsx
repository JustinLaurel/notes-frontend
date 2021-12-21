import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { MIN_USERNAME_LENGTH, USERNAME_ERROR } from "../../constants";
import toasts from '../../utils/toasts/signup';
import { checkAvailability } from "../../state/reducers/signup";
import { Button } from "@chakra-ui/react";

const UsernameAvailableButton = ({ username }: { username: string }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const buttonStyle = {
        "fontSize": "12px",
        "height": "24px",
        "alignSelf": "center",
        "color": "white",
        "width": "min-content",
        "marginLeft": "6px",
        "backgroundColor": "red.700",
        "_hover": {
            bg: "red.500",
            cursor: "pointer"
        },
        "_focus": {
            bg: "blue"
        }
    };


    const handleCheckAvailability = (e: React.FormEvent) => {
        e.preventDefault();

        const lowercase = username.toLowerCase();
        new Promise((resolve) => {
            if (username.length < MIN_USERNAME_LENGTH) throw new Error(USERNAME_ERROR);
            const isAvailable = dispatch(checkAvailability(lowercase));
            resolve(isAvailable);
        })
        .then((isAvailable) => {
            if (typeof isAvailable === 'boolean') {
                if (isAvailable) toast(toasts.available(username));
                else toast(toasts.failed(`username ${username} is already taken`));
            }
        })
        .catch(error => {
            toast(toasts.failed(error.message));
            console.log(`failed checking availability: ${error.message}`);
        });
    };

    return (
        <Button
            {...buttonStyle} 
            as="div" 
            onClick={handleCheckAvailability}>check</Button>
    );
};

export default UsernameAvailableButton;