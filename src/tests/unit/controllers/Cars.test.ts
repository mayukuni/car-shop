import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
// import { carsMockWithId } from '../../mocks/Cars.mock';
import { validCar } from '../../../../__tests__/utils/CarsMock';
import CarsController from '../../../controllers/Cars.controller';
import CarsService from '../../../services/Cars.service';
import CarsModel from '../../../models/Cars.model';


describe('Cars Controller', () => {
  const carsModel = new CarsModel()
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);
  // Nosso req vai ser um objeto com cast de Request, pois o controller só aceita um Request como primeiro parâmetro
  const req = {} as Request;
  // Mesma coisa com o segundo parâmetro
  const res = {} as Response;

  before(() => {
    sinon.stub(carsService, 'create').resolves(validCar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  it('cadastra um novo carro', async () => {
    req.body = validCar;
    await carsController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(validCar)).to.be.true;
  });
});