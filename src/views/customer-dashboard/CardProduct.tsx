// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import CardImageDashboard from 'src/components/customers/dashboard/CardImageDashboard'
import { Book } from 'src/interface/book'

// interface StoreInfo {
//   storeCode: string;
//   stock: number;
// }
    
// interface Product{
//   idProduct: string;
//   name: string;
//   manufacturer: string;
//   price: number;
//   description: string;
//   guarantyMonths: number;
//   stores:StoreInfo[];
// }

interface CardProductProps {
  product: Book;
}


//<CardMedia sx={{ height: '10rem' }} image='/images/cards/watch-on-hand.jpg' />
const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const router = useRouter();
  
  const handleEdit = () => {    
    router.push(`/pages/customer/product-detail/${product.id}`);
  }

  return (
    <Card>
      <CardImageDashboard />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            {product.title}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {product.author}
          </Typography>
        </div>
        <Typography variant='body2'>
          {product.isbn}
        </Typography>        
        <Typography variant='body2'>
          {product.editorial}
        </Typography>
        <Typography variant='body2'>
          Cantidad: {product.amount}
        </Typography>
      </CardContent>
      <Button variant='outlined' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }} onClick={handleEdit}>
        Detalles
      </Button>
    </Card>
  )
}

export default CardProduct
