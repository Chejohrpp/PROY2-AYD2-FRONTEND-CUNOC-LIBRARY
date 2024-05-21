import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getReservation(): Promise<any> {
  try {
    const response = await axios.get('/api/reservation/getReservation/', {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get all reservations');
  }
}

export async function registerReservation(formData: any): Promise<any> {
  try {
      const response = await axios.post('/api/reservation/registerReservation/', formData, {
          headers: {
            Authorization: getCookieJwt()
          }
        });
      return response.data;
  } catch (error: any) {
      throw new Error(error.response.data);
  }
}