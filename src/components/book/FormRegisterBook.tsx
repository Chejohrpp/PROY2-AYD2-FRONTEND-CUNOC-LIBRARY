import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Autocomplete, CardContent, CardHeader, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab'

const transformObjectAutocomplete = (object: any) => {
    return {
        label: object.name,
        object: object
    }
}

export const FormRegisterBook = (props: any) => {
    const formData = props.formData;
    const authors = props.authors.map(transformObjectAutocomplete)
    const editorials = props.editorials.map(transformObjectAutocomplete)

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        props.handleChange(name, value);
    };

    const handleChangeAutocompleteAuthor = (e: any, newValue: any) => {
        if (newValue) {
            props.handleChange("idAuthor", newValue.object.idAuthor);
            props.handleSetSelectedAuthors(newValue)
        } else {
            props.handleChange("idAuthor", null);
            props.handleSetSelectedAuthors(null);
        }
    };

    const handleChangeAutocompleteEditorial = (e: any, newValue: any) => {
        if (newValue) {
            props.handleChange("idEditorial", newValue.object.idEditorial);
            props.handleSetSelectedEditorials(newValue)
        } else {
            props.handleChange("idEditorial", null);
            props.handleSetSelectedEditorials(null);
        }
    };

    const handleFormRegistration = (e: any) => {
        e.preventDefault();
        console.log()
    }
    
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Card>
                <CardHeader title='Registrar Libro' titleTypographyProps={{ variant: 'h6' }} />
                <Divider sx={{ margin: 0 }} />
                <form onSubmit={handleFormRegistration} >
                    <CardContent >
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    label='CODIGO ISBN'
                                    placeholder='ABC-123'
                                    id="isbn"
                                    name='isbn'
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    label='TITULO'
                                    placeholder='The Note'
                                    id="title"
                                    name='title'
                                    value={formData.title}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    type='number'
                                    label='CANTIDAD'
                                    placeholder='12'
                                    id="amount"
                                    name='amount'
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField fullWidth
                                    type='number'
                                    label='PRECIO'
                                    placeholder='29.99'
                                    id="price"
                                    name='price'
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Autocomplete
                                    value={props.selectedAuthor}
                                    onChange={handleChangeAutocompleteAuthor}
                                    disablePortal
                                    id="idAuthor"
                                    options={authors}
                                    renderInput={(params) => <TextField {...params} label="Autor" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Autocomplete
                                    value={props.selectedEditorial}
                                    onChange={handleChangeAutocompleteEditorial}
                                    disablePortal
                                    id="idEditorial"
                                    options={editorials}
                                    renderInput={(params) => <TextField {...params} label="Editorial" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <DatePicker
                                    label="Fecha de Publicacion"                                    
                                    value={formData.datePublish}
                                    onChange={(newValue) => props.handleChange('datePublish', newValue)}
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
