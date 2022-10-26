import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { validCar } from '../../../../__tests__/utils/CarsMock';
import CarsModel from '../../../models/Cars.model';
import { Model } from 'mongoose';
import { carsMockWithId } from '../../mocks/Cars.mock';

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carsMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  it('cadastra um novo carro', async () => {
    const newCar = await carsModel.create(validCar);
			expect(newCar).to.be.deep.equal(carsMockWithId);
  });
});