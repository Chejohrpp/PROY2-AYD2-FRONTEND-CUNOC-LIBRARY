import { setCookie } from 'cookies-next'
import { deleteCookie } from 'cookies-next';

export function logout() {
    // setCookie('jwt', '')
    deleteCookie('jwt');
}