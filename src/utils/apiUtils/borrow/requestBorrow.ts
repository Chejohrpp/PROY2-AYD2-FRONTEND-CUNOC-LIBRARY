import axios from 'axios';
import { getCookieJwt } from 'src/utils/cookieUtils';

export async function getBorrow(): Promise<any> {
  try {
    const response = await axios.get('/api/borrow/getBorrow/', {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get all Borrows');
  }
}

export async function registerBorrow(formData: any): Promise<any> {
  try {
      const response = await axios.post('/api/borrow/createBorrow/', formData, {
          headers: {
            Authorization: getCookieJwt()
          }
        });
      return response.data;
  } catch (error: any) {
      throw new Error(error.response.data);
  }
}

export async function returnBorrow(formData: any): Promise<any> {
  try {
      const response = await axios.post('/api/borrow/returnBorrow/', formData, {
          headers: {
            Authorization: getCookieJwt()
          }
        });
      return response.data;
  } catch (error: any) {
      throw new Error(error.response.data);
  }
}


export async function findBorrowReturnedToday(formattedCurrentDate:any): Promise<any> {
  try {
    const response = await axios.get(`/api/borrow/reportReturnedToday?date=${formattedCurrentDate}`, {
      headers: {
        Authorization: getCookieJwt()
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to get all Borrows');
  }
}
