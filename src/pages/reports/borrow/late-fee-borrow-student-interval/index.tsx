// ** React Imports
import { ReactNode, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Autocomplete, Button, Card, Link, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const transformStudent = (object: any) => {
    return {
        label: object.name,
        object: object
    }
}


const LateFeeBorrowStudentInterval = () => {
    const router = useRouter();
    const [startDate, setStartDate] = useState<Date | any>(null);
    const [endDate, setEndDate] = useState<Date | any>(null);
    const [report, setReport] = useState([])
    const [selectedStudent, setSelectedStudent] = useState<any>(null)
    const [students, setStudents] = useState([])
    const [totalRevenue, setTotalRevenue] = useState(0);
    useEffect(() => {
        const fecthData = async () => {
            // Verificar si el token es válido con el rol 'LIBRARIAN'
            if (!isTokenValid('LIBRARIAN')) {
                redirectToLogin(router);
                return null; // Retornar null para evitar renderizado si el token no es válido
            }
            try {
                const dataStudents = await getStudent();
                setStudents(dataStudents.map(transformStudent))
            } catch (error) {
                console.error(error)
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
            if(selectedStudent){
                const formattedStarDate = startDate.toISOString().split('T')[0];
                const formattedEndDate = endDate.toISOString().split('T')[0];
                const data = await findLateFeeBorrowStudentInterval(selectedStudent.object.id, formattedStarDate,formattedEndDate)
                const {fees, borrows} = data
                console.log(fees)
                setReport(borrows)
            } else{
                errorNotification('Elija un estudiante')
            }            
        } catch (error: any) {
            console.log(error);
            errorNotification(error.message);
        }
    };

    const handleChangeAutocompleteStudent = (e: any, newValue: any) => {
        if (newValue) {
            setSelectedStudent(newValue)
        } else {
            setSelectedStudent(null);
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
                    <Autocomplete
                        value={selectedStudent}
                        onChange={handleChangeAutocompleteStudent}
                        disablePortal
                        id="idStudent"
                        options={students}
                        renderInput={(params) => <TextField {...params} label="Nombre" />}
                    />
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
                            Estudiante
                        </Link>
                    </Typography>
                    <Typography variant='body2'>Listado de moras que un estudiante ha pagado en un intervalo de tiempo</Typography>
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
import { findBorrowReturnedToday, findBorrowRevenueInterval, findLateFeeBorrowStudentInterval } from 'src/utils/apiUtils/borrow/requestBorrow'
import { useRouter } from 'next/router'
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper'
import { getStudent } from 'src/utils/apiUtils/student/requestStudent'
LateFeeBorrowStudentInterval.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default LateFeeBorrowStudentInterval