import { useEffect, useState } from 'react';

// ** MUI Imports
import Grid from "@mui/material/Grid";
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';

export const RegisterCareer = () => {
    const router = useRouter();
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
    });

    const fetch = async () => {
        // Verificar si el token es válido con el rol 'LIBRARIAN'
        if (!isTokenValid('LIBRARIAN')) {
            redirectToLogin(router);
            return null; // Retornar null para evitar renderizado si el token no es válido
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const clearFormData = () => {
        setFormData({
            name: '',
        });
    };

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (name: string, value: any) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegistrationStudent = async () => {
        const isFormFilled = Object.values(formData).every(value => value !== '');
        if (isFormFilled) {
            //send to the backend
            try {
                const data = await registerCareer(formData)
                successNotification('Se ha registrado la carrera')
                clearFormData();
            } catch (error: any) {
                console.log(error)
                errorNotification(error.message);
            }
        } else {
            errorNotification('Llene todos los campos primero');
        }
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <FormRegisterCareer formData={formData} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={12}>
                <ButtonsForm handleConfirmationFormButtons={handleRegistrationStudent} handleCancelFormButtons={clearFormData} />
            </Grid>
        </Grid>
    )
}


import EmployeeLayout from 'src/layouts/EmployeeLayout';
import { ReactNode } from 'react';
import { errorNotification, successNotification } from 'src/utils/helpers/notification';
import { ButtonsForm } from 'src/components/generic/forms/ButtonsForm';
import { registerCareer } from 'src/utils/apiUtils/career/requestCareer';
import { FormRegisterCareer } from 'src/components/career/FormRegisterCareer';
RegisterCareer.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>
export default RegisterCareer;