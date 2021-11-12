const defaultDuration = 3000;

export const loginToasts = (() => {
    const failed = {
        description: 'Login failed. Please try again',
        status: 'error' as const,
        duration: defaultDuration,
        isClosable: true
    };

    const success = (name: string) => {
        return {
            description: `${name} logged in`,
            status: 'success' as const,
            duration: defaultDuration,
            isClosable: true,
        };
    };

    const error = (message: string) => {
        return {
            description: `${message}`,
            status: 'error' as const,
            duration: defaultDuration,
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
            duration: defaultDuration,
            isClosable: true,
        };
    };

    const failed = (message: string) => {
        return {
            description: `Error logging out: ${message}`,
            status: 'error' as const,
            duration: defaultDuration,
            isClosable: true,
        };
    };

    return {
        success,
        failed,
    };
})();