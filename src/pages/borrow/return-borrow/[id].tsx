import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { errorNotification, successNotification, successNotificationWithAction } from 'src/utils/helpers/notification';
import { getCookieJwtGetServerSideProps } from 'src/utils/cookieUtils';

export const ReturnBorrow = ({ data }: any) => {
    const router = useRouter();
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
    if (!data.idBorrow) {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    Prestamo devuelto
                </Grid>
            </Grid>
        )
    }
    const [formData, setFormData] = useState({
        idBorrow: data.idBorrow,
        date: new Date().toISOString(), // Formato ISO para la fecha actual
        lateFee: parseFloat(data.lateFee),
        penalty: parseFloat(data.penalty),
        regularFee: parseFloat(data.regularFee),

        studentName: data.studentName,
        bookTitle: data.bookTitle,
        dateBorrow: data.dateBorrow,
    });

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirmationFormButtons = async () => {
        const isFormFilled = Object.entries(formData).filter(([key, value]) => key !== 'password').every(([key, value]) => value !== '');
        if (isFormFilled) {
            try {
                const senddata = {
                    idBorrow: formData.idBorrow,
                    date: formData.date, 
                    lateFee: formData.lateFee,
                    penalty: formData.penalty,
                    regularFee: formData.regularFee,
                }
                const data = await returnBorrow(senddata)
                successNotificationWithAction('Se ha devuelto el libro', handleCancelFormButtons)
            } catch (error: any) {
                console.error(error.message);
                errorNotification(error.message);
            }
        } else {
            errorNotification('Llene todos los campos primero');
        }
    }

    const handleCancelFormButtons = () => {
        router.push(`/borrow/list-borrows/`);
    }
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <FormReturnBorrow formData={formData} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={12}>
                <ButtonsForm
                    handleConfirmationFormButtons={handleConfirmationFormButtons}
                    handleCancelFormButtons={handleCancelFormButtons}
                />
            </Grid>
        </Grid>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const jwt = getCookieJwtGetServerSideProps(context)
        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/borrow/find_borrow/${context.params.id}`, {
            headers: {
                Authorization: jwt
            }
        });
        const data = await response.data
        return {
            props: {
                data: data
            }
        };
    } catch (error) {
        return {
            props: {
                data: []
            }
        };
    }
}
import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode } from 'react'
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';
import { returnBorrow } from 'src/utils/apiUtils/borrow/requestBorrow';
import { ButtonsForm } from 'src/components/generic/forms/ButtonsForm';
import { Grid } from '@mui/material';
import { FormReturnBorrow } from 'src/components/borrow/FormReturnBorrow';
ReturnBorrow.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ReturnBorrow;
