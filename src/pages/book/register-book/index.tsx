import { useEffect, useState } from 'react';

// ** MUI Imports
import Grid from "@mui/material/Grid";
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';

export const RegisterBook = () => {
    const router = useRouter();

    const [authors, setAuthors] = useState([])
    const [editorials, setEditorials] = useState([])

    const [selectedAuthor, setSelectedAuthor] = useState(null)
    const [selectedEditorial, setSelectedEditorial] = useState(null)

    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        amount: 0,
        price: 0.0,
        datePublish: null,
        idAuthor: null,
        idEditorial: null,
    });

    const fetch = async () => {
        // Verificar si el token es válido con el rol 'LIBRARIAN'
        if (!isTokenValid('LIBRARIAN')) {
            redirectToLogin(router);
            return null; // Retornar null para evitar renderizado si el token no es válido
        }
        try {
            const dataAuthors = await getAuthors()
            const dataEditorial = await getEditorials()
            setAuthors(dataAuthors)
            setEditorials(dataEditorial);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const clearFormData = () => {
        setSelectedAuthor(null)
        setSelectedEditorial(null)
        setFormData({
            isbn: '',
            title: '',
            amount: 0,
            price: 0.0,
            datePublish: null,
            idAuthor: null,
            idEditorial: null,
        });
    };

    const handleSetSelectedAuthors = (value:any) => {
        setSelectedAuthor(value)
    }

    const handleSetSelectedEditorials = (value:any) => {
        setSelectedEditorial(value)
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
                const data = await registerBook(formData)
                successNotification('Se ha registrado el Libro')
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
                <FormRegisterBook 
                    handleSetSelectedAuthors={handleSetSelectedAuthors} 
                    handleSetSelectedEditorials={handleSetSelectedEditorials}
                    selectedAuthor={selectedAuthor} 
                    selectedEditorial={selectedEditorial}
                    authors={authors}
                    editorials={editorials}
                    handleChange={handleChange} 
                    formData={formData} 
                    />
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
import { getAuthors } from 'src/utils/apiUtils/author/requests';
import { getEditorials } from 'src/utils/apiUtils/editorial/requestsEditorial';
import { registerBook } from 'src/utils/apiUtils/book/requestBook';
import { FormRegisterBook } from 'src/components/book/FormRegisterBook';
RegisterBook.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>
export default RegisterBook;