import React, { useEffect, useState } from 'react'

const ListBooks = () => {
  const router = useRouter();
  const fecthData = () => {
    // Verificar si el token es válido con el rol 'LIBRARIAN'
    if (!isTokenValid('LIBRARIAN')) {
      redirectToLogin(router);
      return null; // Retornar null para evitar renderizado si el token no es válido
    }
  }
  const [authorData, setAuthorData] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getBooks()
        setAuthorData(data)
        setData(data);
      } catch (err) {
        console.log(err)
      }
    }
    fecthData()
    fetch();
  }, [])
  
  return (
    <Grid container spacing={6}>
        <Grid item xs={12}>
        <Card>
          <TableBook dataServer={authorData} />
        </Card>
      </Grid>
    </Grid>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
import { Card, Grid } from '@mui/material'
import TableBook from 'src/components/book/list/TableBook'
import { getBooks } from 'src/utils/apiUtils/book/requestBook'
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';
ListBooks.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListBooks;