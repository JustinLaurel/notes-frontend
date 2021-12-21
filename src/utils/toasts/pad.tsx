import { DEFAULT_TOAST_DURATION as DEFAULT_DURATION } from "../../constants";

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