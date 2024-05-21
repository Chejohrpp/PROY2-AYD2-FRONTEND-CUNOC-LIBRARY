// utils/helpers/jwtHelper.ts
//@ts-ignore
import jwt from 'jsonwebtoken';
import { getCookie } from "cookies-next";
import { deleteCookie } from 'cookies-next';

export function decodeJWT(attributeName: string): any {
  try {
    const token = getCookie('jwt');
    
    if (!token) {
      console.error('Error decoding JWT: No token found');
      return null;
    }
    
    const decodedToken: any = jwt.decode(token);

    if (!decodedToken) {
      console.error('Error decoding JWT: Unable to decode token');
      return null;
    }

    return decodedToken[attributeName];
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

interface JWTToken {
  role: string;
  sub: string;
  exp: number;
  iat: number;
}

export function isTokenValid(requiredRole: string | null = null): boolean {
  try {
    const token = getCookie('jwt') as string;
    if (!token) return false;

    const decodedToken = jwt.decode(token) as JWTToken;
    if (!decodedToken) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) return false;

    if (requiredRole && decodedToken.role !== requiredRole) return false;

    return true;
  } catch (error) {
    console.error('Error validating JWT:', error);
    return false;
  }
}


// Refactor `redirectToLogin` para aceptar `router` como argumento
export function redirectToLogin(router:any) {
  deleteCookie('jwt');
  router.push('/pages/login');
}