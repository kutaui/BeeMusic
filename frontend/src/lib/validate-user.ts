import { deleteCookie, getCookie } from 'cookies-next';

export const validateUser = async (validateFunc: any,user:any) => {
    try {
        const {data} = await validateFunc();
        const cookie = getCookie('USER');
        const userInCookie = cookie ? JSON.parse(cookie) : null;

        return !(data.validateJwt.email !== userInCookie.email || data.validateJwt.username !== userInCookie.username);

    } catch (error: any) {
        deleteCookie('USER');

        if (error.message === 'Invalid Credentials.') {
            return false;
        }
        return error;
    }
};