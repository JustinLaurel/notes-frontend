import axios, { AxiosError } from 'axios';
import { ParsedSignupData } from '../types';
import { isTokenData } from '../validators/loginValidators';

const baseUrl = 'http://localhost:3001/users';

const signup = async (user: ParsedSignupData) => {
    try {
        const { data } = await axios.post<unknown>(baseUrl, user);
        if (!isTokenData(data)) throw new Error(`Failed to create account. Please try again`);
        console.log(`signed up, data=${JSON.stringify(data)}`);
        return data;
    } catch(e) {
        throw new Error((e as AxiosError).response?.data.error);
    }
};

const checkUsernameAvailable = async (username: string) => {
    try {
        const { data: isAvailable } = await axios.get<boolean>(`${baseUrl}/${username}`);
        console.log(`isAvailable=${JSON.stringify(isAvailable)}`);
        return isAvailable;    
    } catch(e) {
        throw new Error(`Username available checking error with backend: ${(e as AxiosError).response?.data.error}`);
    }
};

export default {
    signup,
    checkUsernameAvailable
};