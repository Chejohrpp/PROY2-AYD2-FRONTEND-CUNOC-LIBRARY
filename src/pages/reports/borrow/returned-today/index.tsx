// ** React Imports
import { ReactNode, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Button, Card, Link, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'


const ReturnedToday = () => {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState<Date | any>(null);
    const [report, setReport] = useState([])
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
    const fetchData = async () => {
        try {
            // Verifica que ambas fechas estén seleccionadas
            if (!currentDate) {
                errorNotification('Seleccione una fecha')
                return;
            }
            // Formatea las fechas en el formato YYYY-MM-DD
            const formattedCurrentDate = currentDate.toISOString().split('T')[0];
            const data = await findBorrowReturnedToday(formattedCurrentDate)
            setReport(data)
        } catch (error: any) {
            console.log(error);
            errorNotification(error.message);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} >
                    <Typography variant='h5'>
                        <Link target='_blank'>
                            Seleccione la fecha
                        </Link>
                    </Typography>
                    <Typography variant='body2'>Seleccione el 'dia actual'</Typography>
                    <br />
                    <DatePicker
                        label="Dia actual"
                        value={currentDate}
                        onChange={(newValue) => setCurrentDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant='h5'>
                        <Link target='_blank'>
                            Listado de prestamos de un dia
                        </Link>
                    </Typography>
                    <Typography variant='body2'>Listado de los prestamos realizados en el dia 'actual'</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <TableBorrow dataServer={report} />
                    </Card>
                </Grid>
            </Grid>
        </LocalizationProvider>
    )
}


import EmployeeLayout from 'src/layouts/EmployeeLayout'
import TableBorrow from 'src/components/borrow/list/TableBorrow'
import { errorNotification } from 'src/utils/helpers/notification'
import { findBorrowReturnedToday } from 'src/utils/apiUtils/borrow/requestBorrow'
import { useRouter } from 'next/router'
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper'
ReturnedToday.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ReturnedToday