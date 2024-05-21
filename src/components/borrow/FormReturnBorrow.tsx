import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Autocomplete, CardContent, CardHeader, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab'


export const FormReturnBorrow = (props: any) => {
    const formData = props.formData;

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        props.handleChange(name, value);
    };

    const handleFormRegistration = (e: any) => {
        e.preventDefault();
        console.log()
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Card>
                <CardHeader title='Retornar libro' titleTypographyProps={{ variant: 'h6' }} />
                <Divider sx={{ margin: 0 }} />
                <form onSubmit={handleFormRegistration} >
                    <CardContent >
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    label='NOMBRE ESTUDIANTE'
                                    id="studentName"
                                    name='studentName'
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    label='LIBRO'
                                    id="booktitle"
                                    name='booktitle'
                                    value={formData.bookTitle}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='COSTO TARDANZA'
                                    id="lateFee"
                                    name='lateFee'
                                    value={formData.lateFee}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='PENALIDAD'
                                    id="penalty"
                                    name='penalty'
                                    value={formData.penalty}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='COSTO REGULAR'
                                    id="regularFee"
                                    name='regularFee'
                                    value={formData.regularFee}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='FECHA PRESTAMO'
                                    id="dateBorrow"
                                    name='dateBorrow'
                                    value={formData.dateBorrow}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <DatePicker
                                    label="Fecha devolucion"
                                    value={formData.date}
                                    onChange={(newValue) => props.handleChange('date', newValue)}
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
