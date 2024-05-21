// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import CustomerCatalog from 'src/views/customer-dashboard/CustomerCatalog'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, Link, Typography } from '@mui/material'
import { getAllProducts } from 'src/utils/apiUtils/product/allProductsUtil'
import { SearchBarProductDashboard } from 'src/components/customers/dashboard/SearchBarProductDashboard'


const DashboardConsumer = () => {

  const router = useRouter();
  const fecthData = () => {
    // Verificar si el token es válido con el rol 'STUDENT'
    if (!isTokenValid('STUDENT')) {
      redirectToLogin(router);
      return null; // Retornar null para evitar renderizado si el token no es válido
    }
  }

  const [productsData, setProductsData] = useState([]);  
  const [products, setProducts] = useState([]);  

  const handleSearch = (searchValue: string | null) => {
    const findProduct = products.filter((product: Book) => {
      if (searchValue) {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return (
          product.isbn.toLowerCase().includes(lowerCaseSearchValue) ||
          product.title.toLowerCase().includes(lowerCaseSearchValue)
        );
      } else {
        return true;
      }
    });    
    setProductsData(findProduct);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsD = await getBooks();   
        setProductsData(productsD);
        setProducts(productsD);     
      } catch (error) {
        console.log(error);
        // Aquí puedes manejar el error si es necesario
      }
    };
    fecthData();
    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Typography variant='h5'>
          <Link target='_blank'>
            Listado de Libros
          </Link>
        </Typography>
        <Typography variant='body2'>Listado general de todos los libros</Typography>
      </Grid>
      <Grid item xs={12} md={8} >
        <SearchBarProductDashboard handleSearch={handleSearch} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
        <CustomerCatalog products={productsData}/>
        </Card>
      </Grid>
    </Grid>
  )
}

import UserLayout from 'src/layouts/UserLayout'
import { getBooks } from 'src/utils/apiUtils/book/requestBook'
import { Book } from 'src/interface/book'
import { useRouter } from 'next/router'
import { isTokenValid, redirectToLogin } from 'src/utils/helpers/jwtHelper'
DashboardConsumer.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

export default DashboardConsumer
