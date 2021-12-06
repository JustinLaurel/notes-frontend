import axios, { AxiosError } from 'axios';
import { Credentials, TokenData } from '../types';

const baseUrl = '/api/login';

const login = async (credentials: Credentials) => {
    try {
        console.log(`logging in`);
        const { data } = await axios.post<TokenData>(baseUrl, {...credentials});
        return data;
    } catch(e) {
        throw new Error((e as AxiosError).response?.data.error);
        
    }
};

export default {
    login,
};