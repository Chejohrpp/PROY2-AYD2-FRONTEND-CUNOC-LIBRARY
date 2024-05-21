import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';

export const FormRegisterCareer = (props: any) => {
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
        <Card>
            <CardHeader title='Registrar Carrera' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={handleFormRegistration} >
                <CardContent >
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} >
                            <TextField fullWidth
                                label='NOMBRE'
                                placeholder='ing sistemas'
                                id="name"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                inputProps={{ maxLength: 50 }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </form>
        </Card>
    )
}
