import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from "@mui/material/Grid";
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper'

export const RegisterStudent = () => {
    const router = useRouter();
    const [careers, setCareers] = useState([])
    const [selectedCareer, setSelectedCareer] = useState(null)
    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        carnet: '',
        birth: null,
        idCareer: null,
    });

    const fetch = async () => {
        // Verificar si el token es válido con el rol 'LIBRARIAN'
        if (!isTokenValid('LIBRARIAN')) {
            redirectToLogin(router);
            return null; // Retornar null para evitar renderizado si el token no es válido
        }
        try {
            const dataCareers = await getCareers()
            setCareers(dataCareers);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const clearFormData = () => {
        setSelectedCareer(null)
        setFormData({
            username: '',
            name: '',
            carnet: '',
            birth: null,
            idCareer: null,
        });
    };

    const handleSetSelectedCareer = (value:any) => {
        setSelectedCareer(value)
    }

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
                const data = await registerStudent(formData)
                successNotification('Se ha registrado el estudiante')
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
                <FormRegisterStudent handleSetSelectedCareer={handleSetSelectedCareer} selectedCareer={selectedCareer} formData={formData} carrers={careers} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={12}>
                <ButtonsForm handleConfirmationFormButtons={handleRegistrationStudent} handleCancelFormButtons={clearFormData} />
            </Grid>
        </Grid>
    )
}


import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode } from 'react'
import { FormRegisterStudent } from 'src/components/student/registerStudent'
import { errorNotification, successNotification } from 'src/utils/helpers/notification';
import { registerStudent } from 'src/utils/apiUtils/student/requestStudent';
import { ButtonsForm } from 'src/components/generic/forms/ButtonsForm';
import { getCareers } from 'src/utils/apiUtils/career/requestCareer';
import { logout } from 'src/utils/helpers/logout';
RegisterStudent.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>
export default RegisterStudent;