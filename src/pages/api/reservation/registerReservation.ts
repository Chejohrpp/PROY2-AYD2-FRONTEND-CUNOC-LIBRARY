import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next/types";
import { getJwt } from '../jwtUtils';


export async function handlePost (req: NextApiRequest, res: NextApiResponse) {
    try {
         // Convierte el cuerpo de la solicitud a SaleData
        const body = req.body;
         
         // Hacer la solicitud POST
        const response = await axios.post(`${process.env.URL_API_BACKEND}/v1/reservation/create`,body, {
            headers: {
                Authorization: getJwt(req)
            }
        });
        const data  = await response.data
        return res.status(response.status).json(data);
    }catch (error: any) {
        return res.status(error.response.status).json(error.response.data);
    }  
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return handlePost(req, res);
    } else {
        // Si es otro método de solicitud, devuelve un error de método no permitido
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
}