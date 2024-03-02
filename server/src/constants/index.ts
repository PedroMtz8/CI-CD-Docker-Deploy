import * as dotenv from 'dotenv'
dotenv.config();

export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;