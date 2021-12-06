import axios, { AxiosError } from 'axios';
import { generateAuthHeader } from '../state/reducers/login';
import { Pad } from '../types';
import { parsePad } from '../validators/padValidators';

const baseUrl = '/api/pad';

const get = async () => {
    try {
        const header = generateAuthHeader();
        if (header) {
            const { data: pad } = await axios.get<Pad>(baseUrl, header);
            return parsePad(pad);
        } else return null;
    } catch(e) {
        throw new Error((e as AxiosError).response?.data);
    }
};

const update = async (content: string) => {
    try {
        const header = generateAuthHeader();
        if (header) {
            const { data: pad } = await axios.put<Pad>(baseUrl, {content}, header);
            return pad;
        } else return null;
    } catch(e) {
        throw new Error((e as AxiosError).response?.data);
    }
};

export default{
    get,
    update,
};