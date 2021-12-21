import { DEFAULT_TOAST_DURATION as DEFAULT_DURATION } from "../../constants";
const signupToasts = (() => {
    const failed = (message: string) => {
        return {
            description: message,
            status: 'error' as const,
            duration: DEFAULT_DURATION,
            isClosable: true
        };
    };

    const available = (username: string) => {
        return {
            description: `username ${username} is available`,
            status: 'success' as const,
            duration: DEFAULT_DURATION,
            isClosable: true
        };
    };

    const success = {
        description: `Account successfully created`,
        status: 'success' as const,
        duration: DEFAULT_DURATION,
        isClosable: true,
    };

    return {
        failed,
        success,
        available
    };
})();

export default signupToasts;