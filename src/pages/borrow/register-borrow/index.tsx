import { useEffect, useState } from 'react';

// ** MUI Imports
import Grid from "@mui/material/Grid";
import { useRouter } from 'next/router';
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper';

export const RegisterBorrow = () => {
    const router = useRouter();

    const [students, setStudents] = useState([])
    const [books, setBooks] = useState([])

    const [selectedStudent, setSelectedStudent] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)

    // Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        dateBorrow: null,
        carnet: null,
        isbn: null,
    });

    const fetch = async () => {
        // Verificar si el token es válido con el rol 'LIBRARIAN'
        if (!isTokenValid('LIBRARIAN')) {
            redirectToLogin(router);
            return null; // Retornar null para evitar renderizado si el token no es válido
        }
        try {
            const dataStudents = await getStudent()
            const dataBook = await getBooks()
            setStudents(dataStudents)
            setBooks(dataBook);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    const clearFormData = () => {
        setSelectedStudent(null)
        setSelectedBook(null)
        setFormData({
            dateBorrow: null,
            carnet: null,
            isbn: null,
        });
    };

    const handleSetSelectedStudents = (value: any) => {
        setSelectedStudent(value)
    }

    const handleSetSelectedBooks = (value: any) => {
        setSelectedBook(value)
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
                const data = await registerBorrow(formData)
                successNotification('Se ha registrado el Prestamo')
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
                <FormRegisterBorrow
                    handleSetSelectedStudents={handleSetSelectedStudents}
                    handleSetSelectedBooks={handleSetSelectedBooks}
                    selectedStudent={selectedStudent}
                    selectedBook={selectedBook}
                    students={students}
                    books={books}
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
import { getBooks } from 'src/utils/apiUtils/book/requestBook';
import { getStudent } from 'src/utils/apiUtils/student/requestStudent';
import { FormRegisterBorrow } from 'src/components/borrow/FormRegisterBorrow';
import { registerBorrow } from 'src/utils/apiUtils/borrow/requestBorrow';
RegisterBorrow.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>
export default RegisterBorrow;