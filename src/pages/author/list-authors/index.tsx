import React, { useEffect, useState } from 'react'

const ListAuthors = () => {
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
        const data = await getAuthors()
        setAuthorData(data)
        setData(data);
        fecthData()
      } catch (err) {
        console.log(err)
      }
    }
    fetch();
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableAuthor dataServer={authorData} />
        </Card>
      </Grid>
    </Grid>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode } from 'react'
import { getAuthors } from 'src/utils/apiUtils/author/requests'
import { Card, Grid } from '@mui/material'
import TableAuthor from 'src/components/author/list/TableAuthor'
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';
ListAuthors.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListAuthors;