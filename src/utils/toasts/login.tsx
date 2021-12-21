import { DEFAULT_TOAST_DURATION as DEFAULT_DURATION } from "../../constants";

export const loginToasts = (() => {
    const failed = {
        description: 'Login failed. Please try again',
        status: 'error' as const,
        duration: DEFAULT_DURATION,
        isClosable: true
    };

    const success = (name: string) => {
        return {
            description: `logged in as ${name}`,
            status: 'success' as const,
            duration: DEFAULT_DURATION,
            isClosable: true,
        };
    };

    const error = (message: string) => {
        return {
            description: `${message}`,
            status: 'error' as const,
            duration: DEFAULT_DURATION,
            isClosable: true,
        };
    };

    return {
        failed,
        success,
        error
    };
})();

export const logoutToasts = (() => {
    const success = (name: string) => {
        return {
            description: `${name} logged out`,
            status: 'success' as const,
            duration: DEFAULT_DURATION,
            isClosable: true,
        };
    };

    const failed = (message: string) => {
        return {
            description: `Error logging out: ${message}`,
            status: 'error' as const,
            duration: DEFAULT_DURATION,
            isClosable: true,
        };
    };

    return {
        success,
        failed,
    };
})();