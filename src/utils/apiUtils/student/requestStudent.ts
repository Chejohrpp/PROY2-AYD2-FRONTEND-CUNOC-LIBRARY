import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getStudent(): Promise<any> {
  try {
    const response = await axios.get('/api/student/getStudent/', {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get all students');
  }
}

export async function registerStudent(formData: any): Promise<any> {
  try {
      const response = await axios.post('/api/student/registerStudent/', formData, {
          headers: {
            Authorization: getCookieJwt()
          }
        });
      return response.data;
  } catch (error: any) {
      throw new Error(error.response.data);
  }
}