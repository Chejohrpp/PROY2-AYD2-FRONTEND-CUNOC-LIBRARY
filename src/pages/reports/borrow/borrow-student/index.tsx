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

const BorrowCareerInterval = () => {
    const router = useRouter();
    const [selectedStudent, setSelectedStudent] = useState<any>(null)
    const [students, setStudents] = useState([])
    const [report, setReport] = useState([])
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
            if(selectedStudent){
                const data = await findBorrowStudent(selectedStudent.object.id)
                setReport(data)
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
                            Seleccione El estudiante
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
                    <br />
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant='h5'>
                        <Link target='_blank'>
                            Prestamos por estudiante
                        </Link>
                    </Typography>
                    <Typography variant='body2'>Listado de libros que están prestados actualmente a un estudiante</Typography>
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
import { findBorrowCareerInterval, findBorrowReturnedToday, findBorrowRevenueInterval, findBorrowStudent } from 'src/utils/apiUtils/borrow/requestBorrow'
import { useRouter } from 'next/router'
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper'
import { getStudent } from 'src/utils/apiUtils/student/requestStudent'
BorrowCareerInterval.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default BorrowCareerInterval