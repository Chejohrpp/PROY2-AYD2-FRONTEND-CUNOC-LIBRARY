import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getEditorials(): Promise<any> {
  try {
    const response = await axios.get('/api/editorial/getEditorials/', {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get all customers');
  }
}