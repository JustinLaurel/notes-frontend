const DEFAULT_DURATION = 3000;

export const noteToasts = (() => {
    const notLoggedIn = {
        description: 'You need to be logged in to add notes',
        status: 'error' as const,
        duration: DEFAULT_DURATION,
        isClosable: true,
    };

    const noteTooShort = {
        description: 'Note is too short!',
        status: 'error' as const,
        duration: DEFAULT_DURATION,
        isClosable: true
    };

    const failedGet = {
        description: `Failed to get notes, please check your network`,
        status: 'error' as const,
        duration: DEFAULT_DURATION,
        isClosable: true,
    };

    const failedCreate = {
        description: `Failed to create note`,
        status: 'error' as const,
        duration: DEFAULT_DURATION,
        isClosable: true,
    };

    return {
        notLoggedIn,
        noteTooShort,
        failedGet,
        failedCreate
    };
})();