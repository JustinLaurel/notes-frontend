import axios, { AxiosError } from 'axios';
import { Credentials, TokenData } from '../types';

const baseUrl = 'http://localhost:3001/login';

const login = async (credentials: Credentials) => {
    try {
        const { data } = await axios.post<TokenData>(baseUrl, {...credentials});
        return data;
    } catch(e) {
        throw new Error((e as AxiosError).response?.data.error);
        
    }
};

export default {
    login,
};