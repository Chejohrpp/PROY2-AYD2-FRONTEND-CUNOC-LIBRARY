import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Autocomplete, CardContent, CardHeader, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab'

const transformStudent = (object: any) => {
    return {
        label: object.carnet,
        object: object
    }
}

const transformBook = (object: any) => {
    return {
        label: object.isbn,
        object: object
    }
}

export const FormRegisterBorrow = (props: any) => {
    const formData = props.formData;
    const students = props.students.map(transformStudent)
    const books = props.books.map(transformBook)

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        props.handleChange(name, value);
    };

    const handleChangeAutocompleteStudent = (e: any, newValue: any) => {
        if (newValue) {
            props.handleChange("carnet", newValue.object.carnet);
            props.handleSetSelectedStudents(newValue)
        } else {
            props.handleChange("carnet", null);
            props.handleSetSelectedStudents(null);
        }
    };

    const handleChangeAutocompleteBook = (e: any, newValue: any) => {
        if (newValue) {
            props.handleChange("isbn", newValue.object.isbn);
            props.handleSetSelectedBooks(newValue)
        } else {
            props.handleChange("isbn", null);
            props.handleSetSelectedBooks(null);
        }
    };

    const handleFormRegistration = (e: any) => {
        e.preventDefault();
        console.log()
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Card>
                <CardHeader title='Registrar Prestamo' titleTypographyProps={{ variant: 'h6' }} />
                <Divider sx={{ margin: 0 }} />
                <form onSubmit={handleFormRegistration} >
                    <CardContent >
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6} >
                                <Autocomplete
                                    value={props.selectedStudent}
                                    onChange={handleChangeAutocompleteStudent}
                                    disablePortal
                                    id="idStudent"
                                    options={students}
                                    renderInput={(params) => <TextField {...params} label="Carnet" />}
                                />
                                {props.selectedStudent !== null && (
                                    <FormHelperText id="form-idStudent">
                                        {props.selectedStudent.object.name}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Autocomplete
                                    value={props.selectedBook}
                                    onChange={handleChangeAutocompleteBook}
                                    disablePortal
                                    id="idbook"
                                    options={books}
                                    renderInput={(params) => <TextField {...params} label="ISBN" />}
                                />
                                {props.selectedBook !== null && (
                                    <FormHelperText id="form-idStudent">
                                        {props.selectedBook.object.title}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <DatePicker
                                    label="Fecha de Prestamo"
                                    value={formData.dateBorrow}
                                    onChange={(newValue) => props.handleChange('dateBorrow', newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </form>
            </Card>
        </LocalizationProvider>
    )
}
