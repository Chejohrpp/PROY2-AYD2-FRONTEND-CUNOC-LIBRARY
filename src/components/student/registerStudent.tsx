import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Autocomplete, CardContent, CardHeader, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useState, MouseEvent } from 'react'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab'

const transformCareer = (career: any) => {
    return {
        label: career.name,
        career: career
    }
}

export const FormRegisterStudent = (props: any) => {
    const formData = props.formData;
    const careers = props.carrers.map(transformCareer)
    

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        props.handleChange(name, value);
    };

    const handleChangeAutocomplete = (e: any, newValue: any) => {
        if (newValue) {
            props.handleChange("idCareer", newValue.career.idCareer);
            props.handleSetSelectedCareer(newValue)
        } else {
            props.handleChange("idCareer", null);
            props.handleSetSelectedCareer(null);
        }
    };

    const handleFormRegistration = (e: any) => {
        e.preventDefault();
        console.log()
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Card  >
                <CardHeader title='Registrar Estudiante' titleTypographyProps={{ variant: 'h6' }} />
                <Divider sx={{ margin: 0 }} />
                <form onSubmit={handleFormRegistration} >
                    <CardContent >
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    label='CARNET'
                                    placeholder='201931555'
                                    id="carnet"
                                    name='carnet'
                                    value={formData.carnet}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    label='USERNAME'
                                    placeholder='Juan#000'
                                    id="username"
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 45 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    label='Nombre'
                                    placeholder='Juan'
                                    id="name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Autocomplete
                                    value={props.selectedCareer}
                                    onChange={handleChangeAutocomplete}
                                    disablePortal
                                    id="idCareer"
                                    options={careers}
                                    renderInput={(params) => <TextField {...params} label="Carrera" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <DatePicker
                                    label="Fecha de cumpleaños"                                    
                                    value={formData.birth}
                                    onChange={(newValue) => props.handleChange('birth', newValue)}
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
