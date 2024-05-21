import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardMedia from '@mui/material/CardMedia';
import { getCookieJwt } from 'src/utils/cookieUtils';

const CardImageDashboard = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  return (
    <div>      
      {imageSrc ? (        
        <CardMedia sx={{ height: '9.375rem' }} image={imageSrc} />
      ) : (
        <CardMedia sx={{ height: '9.375rem' }} image='/images/imagotipo.png' />
      )}
    </div>
  );
};

export default CardImageDashboard;