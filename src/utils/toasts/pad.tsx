const DEFAULT_DURATION = 3000;

export const padToasts = (() => {
    const error = {
        description: 'Failed to retrieve Pad contents',
        status: 'error' as const,
        duration: DEFAULT_DURATION,
        isClosable: true
    };

    return {
        error
    };
})();