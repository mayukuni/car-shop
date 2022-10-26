import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import CarsRouter from './routes/Cars.route';

const app = express();
app.use(express.json());
app.use(CarsRouter);
app.use(errorHandler);

export default app;
