const DEFAULT_DURATION = 3000;

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