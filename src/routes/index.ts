// Em seu arquivo de rotas (por exemplo, routes.js)
import express from 'express';
import { getWeatherCurrent } from '../controllers/weather';

const router = express.Router();

router.get('/', getWeatherCurrent);

export default router;
