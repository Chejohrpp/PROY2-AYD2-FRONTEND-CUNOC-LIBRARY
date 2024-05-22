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


export async function findBorrowRevenueInterval(startDate:any, endDate:any): Promise<any> {
  try {
    const response = await axios.get(`/api/borrow/reportBorrowRevenueInterval?startDate=${startDate}&endDate=${endDate}`, {
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

export async function findBorrowCareerInterval(startDate:any, endDate:any): Promise<any> {
  try {
    const response = await axios.get(`/api/borrow/reportBorrowCareerInterval?startDate=${startDate}&endDate=${endDate}`, {
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

export async function findBorrowStudent(id:any): Promise<any> {
  try {
    const response = await axios.get(`/api/borrow/reportBorrowStudent?idStudent=${id}`, {
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

export async function findLateFeeBorrowStudentInterval(id:any,startDate:any, endDate:any): Promise<any> {
  try {
    const response = await axios.get(`/api/borrow/reportLateFeeBorrowStudentInterval?idStudent=${id}&startDate=${startDate}&endDate=${endDate}`, {
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


export async function finStudentMostBorroInterval(startDate:any, endDate:any): Promise<any> {
  try {
    const response = await axios.get(`/api/borrow/reportStudentMostBorrowInterval?startDate=${startDate}&endDate=${endDate}`, {
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