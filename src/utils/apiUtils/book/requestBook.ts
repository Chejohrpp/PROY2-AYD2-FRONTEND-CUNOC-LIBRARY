import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getBooks(): Promise<any> {
  try {
    const response = await axios.get('/api/book/getBook/', {
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


export async function getBook(id:any): Promise<any> {
  try {
    const response = await axios.get(`/api/book/getBookId/?id=${id}`, {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get the book');
  }
}

export async function registerBook(formData: any): Promise<any> {
  try {
      const response = await axios.post('/api/book/registerBook/', formData, {
          headers: {
            Authorization: getCookieJwt()
          }
        });
      return response.data;
  } catch (error: any) {
      throw new Error(error.response.data);
  }
}