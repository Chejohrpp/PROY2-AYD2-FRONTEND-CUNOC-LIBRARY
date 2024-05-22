// ** React Imports
import { ReactNode, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Button, Card, Link, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'


const BorrowCareerInterval = () => {
    const router = useRouter();
    const [startDate, setStartDate] = useState<Date | any>(null);
    const [endDate, setEndDate] = useState<Date | any>(null);
    const [report, setReport] = useState([])
    const [careerName, setCareerName] = useState('')
    const [totalRegister, setTotalRegister] = useState(0);
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
            if (!startDate || !endDate) {
                errorNotification('Se necesita un intervalo correcto')
                return;
            }
            // Formatea las fechas en el formato YYYY-MM-DD
            const formattedStarDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];
            const data = await findBorrowCareerInterval(formattedStarDate,formattedEndDate)
            const {careerName, totalRegisters, borrows} = data
            setCareerName(careerName)
            setTotalRegister(totalRegisters)
            setReport(borrows)
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
                    <br />
                    <DatePicker
                        label="Fecha Inicial"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="Fecha Final"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
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
                            Carreras de registros
                        </Link>
                    </Typography>
                    <Typography variant='body2'>Listado de las Carrera que tiene más registros de préstamos en un intervalo de tiempo</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        Carrera: {careerName}
                        <br />
                        total de Registros: {totalRegister}
                    </Card>
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
import { findBorrowCareerInterval, findBorrowReturnedToday, findBorrowRevenueInterval } from 'src/utils/apiUtils/borrow/requestBorrow'
import { useRouter } from 'next/router'
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper'
BorrowCareerInterval.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default BorrowCareerInterval