import { Card, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { getCookieJwtGetServerSideProps } from 'src/utils/cookieUtils';

const InLateState = ({ report }: any) => {
    const router = useRouter();
    console.log(report)
    useEffect(() => {
        const fecthData = () => {
             // Verificar si el token es válido con el rol 'LIBRARIAN'
            if (!isTokenValid('LIBRARIAN')) {
                redirectToLogin(router);
                return null; // Retornar null para evitar renderizado si el token no es válido
            }
        }
        fecthData()
    }, [])
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                    <Link target='_blank'>
                        Reporte de Prestamos retrasados
                    </Link>
                </Typography>
                <Typography variant='body2'>Listado de préstamos de libros que están en mora</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableBorrow dataServer={report} />
                </Card>
            </Grid>
        </Grid>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const jwt = getCookieJwtGetServerSideProps(context)
        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/report/borrows_late`, {
            headers: {
                Authorization: jwt
            }
        })
        const data = await response.data

        return {
            props: {
                report: data
            }
        };
    } catch (error) {
        return {
            props: {
                report: []
            }
        };
    }
}

import EmployeeLayout from 'src/layouts/EmployeeLayout';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';
import TableBook from 'src/components/book/list/TableBook';
import TableBorrow from 'src/components/borrow/list/TableBorrow';
InLateState.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default InLateState;
