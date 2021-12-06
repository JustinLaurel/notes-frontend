import padService from "../../services/padService";

export const getPad = async () => {
    return await padService.get();
};

export const updatePad = async (content: string) => {
    return await padService.update(content);
};