// ** React Imports
//import { useState, ChangeEvent } from 'react'
import * as React from 'react';
import { useState, Fragment } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'
import CardProduct from './CardProduct';
import { Book } from 'src/interface/book';


interface CatalogProductProps {
  products: Book[];
}


const CustomerCatalog: React.FC<CatalogProductProps> = ({ products }) => {
    // console.log(props.dataServer);
  const rows = products;

  return (
    <Grid container spacing={6}>
        {
        products.map(product =>  {
          return (        
            <Grid item xs={12} sm={6} md={4}>
                <CardProduct product={product}/>            
            </Grid> 
          )
          })
        }
    </Grid>
  );
}
export default CustomerCatalog