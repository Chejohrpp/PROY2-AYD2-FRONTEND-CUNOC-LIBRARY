import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getAuthors(): Promise<any> {
  try {
    const response = await axios.get('/api/author/getAuthor/', {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get all authors');
  }
}