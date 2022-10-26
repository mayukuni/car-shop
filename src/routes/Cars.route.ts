import { Router } from 'express';
import CarsController from '../controllers/Cars.controller';
import CarsModel from '../models/Cars.model';
import CarsService from '../services/Cars.service';

const route = Router();

const cars = new CarsModel();
const carsService = new CarsService(cars);
const carsController = new CarsController(carsService);

route.post('/cars', (req, res) => carsController.create(req, res));
route.get('/cars', (req, res) => carsController.read(req, res));
route.get('/cars/:id', (req, res) => carsController.readOne(req, res));

export default route;