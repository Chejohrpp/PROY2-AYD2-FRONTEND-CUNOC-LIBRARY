import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material';
import { getCookieJwt } from 'src/utils/cookieUtils';

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
    height: '14rem',
    borderRadius: theme.shape.borderRadius
  }))

const ImageComponentDetail = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    return (
      <div>        
        {imageSrc ? (
          <Img src={imageSrc} alt={`Product`} />
        ) : (
            <Img alt='Not found' src='/images/imagotipo.png' />
        )}        
      </div>
    );
};

export default ImageComponentDetail;