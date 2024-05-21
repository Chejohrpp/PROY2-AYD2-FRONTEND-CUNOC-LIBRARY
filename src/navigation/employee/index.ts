// ** Icon imports
import ListBoxOutline from 'mdi-material-ui/ListBoxOutline'
import AccountPlus from 'mdi-material-ui/AccountPlus'
import FileChartOutline from 'mdi-material-ui/FileChartOutline'
import NotebookPlus from 'mdi-material-ui/NotebookPlus'
import CardPlus from 'mdi-material-ui/CardPlus'
import BookArrowRight from 'mdi-material-ui/BookArrowRight'
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Listados'
    },
    {
      icon: ListBoxOutline,
      title: 'Autores',
      path: '/author/list-authors'
    },
    {
      icon: ListBoxOutline,
      title: 'Editoriales',
      path: '/editorial/list-editorials'
    },
    {
      icon: ListBoxOutline,
      title: 'Libros',
      path: '/book/list-books'
    },
    {
      icon: ListBoxOutline,
      title: 'Carreras',
      path: '/career/list-careers'
    },
    {
      icon: ListBoxOutline,
      title: 'Estudiantes',
      path: '/student/list-students'
    },
    {
      icon: ListBoxOutline,
      title: 'Prestamos',
      path: '/borrow/list-borrows'
    },
    {
      icon: ListBoxOutline,
      title: 'Reservaciones',
      path: '/reservation/list-reservations'
    },
    {  
      sectionTitle: 'Creaciones'
    },
    {
      icon: AccountPlus,
      title: 'Crear Estudiante',
      path: '/student/register-student'
    },
    {
      icon: NotebookPlus,
      title: 'Crear Libro',
      path: '/book/register-book'
    },

    {
      icon: CardPlus,
      title: 'Crear Carrera',
      path: '/career/register-career'
    },
    
    {
      sectionTitle: 'Prestamos'
    },
    {
      icon: BookArrowRight,
      title: 'Realizar Prestamo',
      path: '/borrow/register-borrow',      
    },
    {
      title: 'Reportes',      
      sectionTitle: 'Reportes'
    },
    {
      icon: FileChartOutline,
      title: 'préstamos de libros que deben ser entregados el día actual',
      path: '/reports/borrow/returned-today'
    },
    {
      icon: FileChartOutline,
      title: 'préstamos de libros que están en mora',
      path: '/reports/borrow/in-late-state'
    },
    {
      icon: FileChartOutline,
      title: 'Total de dinero recaudado en un intervalo de tiempo',
      path: '/reports/sales-by-idCustomer'
    },
    {
      title: 'Carrera que tiene más registros de préstamos en un intervalo de tiempo',
      path: '/reports/orders/in-time-pending-verify',
      icon: FileChartOutline
    },
    {
      title: 'moras que un estudiante ha pagado en un intervalo de tiempo',
      path: '/reports/orders/overdue-arriving-store',
      icon: FileChartOutline
    },
    {
      title: ' libros que nunca se han prestado',
      path: '/reports/books/never-borrowed',
      icon: FileChartOutline
    },
    {
      title: 'libros que están prestados actualmente a un estudiante',
      path: '/reports/orders/leaving-store-in-transit',
      icon: FileChartOutline
    },
    {
      title: 'El estudiante que más préstamos ha realizado en un intervalo de tiempo',
      path: '/reports/orders/leaving-store-in-transit',
      icon: FileChartOutline
    },
    {
      title: 'libros cuyas copias están agotadas actualmente',
      path: '/reports/books/out-stock',
      icon: FileChartOutline
    },
    {
      title: 'Estudiantes que están en sanción',
      path: '/reports/student/with-penalties',
      icon: FileChartOutline
    },
  ]
}

export default navigation