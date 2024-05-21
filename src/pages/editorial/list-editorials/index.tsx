import React, { useEffect, useState } from 'react'

const ListEditorials = () => {
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
        const data = await getEditorials()
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
          <TableEditorial dataServer={authorData} />
        </Card>
      </Grid>
    </Grid>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
import { Card, Grid } from '@mui/material'
import { getEditorials } from 'src/utils/apiUtils/editorial/requestsEditorial'
import TableEditorial from 'src/components/editorial/list/TableEditorial'
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';
ListEditorials.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListEditorials;