// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'
import { Divider } from '@mui/material'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import ImageComponentDetail from 'src/components/customers/dashboard/ImageComponent'
import { Book } from 'src/interface/book'
import { decodeJWT } from 'src/utils/helpers/jwtHelper'
import { registerReservation } from 'src/utils/apiUtils/reservation/requestReservation'
import { errorNotification, successNotification } from 'src/utils/helpers/notification'

interface ProductDetailCardProps {
  product: Book;
}
//<Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' />
const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const handleReservation = async () => {
    const username = decodeJWT('sub');
    try {
      const senddata = {
        date: new Date().toISOString(), // Formato ISO para la fecha actual
        username: username,
        idBook: product.id
      }
      const data = await registerReservation(senddata)
      successNotification('Se ha registrado la reservacion')
    } catch (error:any) {
      errorNotification(error.message);      
    }
  }
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImageComponentDetail />
          </CardContent>
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant='h5' sx={{ marginBottom: 2 }}>
              {product.title}
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              {product.isbn}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 4 }}>
              Cantidad: {product.amount}
            </Typography>
            <Divider variant="middle" />
            <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <FactoryOutlinedIcon sx={{ marginRight: 1 }} />Fecha de publicacion: {product.datePublish}
            </Typography>
            <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <StorefrontOutlinedIcon sx={{ marginRight: 1 }} />Editorial: {product.editorial}
            </Typography>
            <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <GppGoodOutlinedIcon sx={{ marginRight: 1 }} /> Author: {product.author}
            </Typography>
            <Button variant='outlined' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }} onClick={handleReservation}>
              Reservar
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProductDetailCard
