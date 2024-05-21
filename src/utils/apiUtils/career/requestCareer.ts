import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getCareers(): Promise<any> {
  try {
    const response = await axios.get('/api/career/getCareer/', {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get all careers');
  }
}

export async function registerCareer(formData: any): Promise<any> {
  try {
      const response = await axios.post('/api/career/registerCareer/', formData, {
          headers: {
            Authorization: getCookieJwt()
          }
        });
      return response.data;
  } catch (error: any) {
      throw new Error(error.response.data);
  }
}