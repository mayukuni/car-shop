import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { validCar } from '../../../../__tests__/utils/CarsMock';
import CarsModel from '../../../models/Cars.model';
import { Model } from 'mongoose';
import { carMockWithId } from '../../mocks/Cars.mock';
import { ErrorTypes } from '../../../errors/catalog';
import { ICar } from '../../../interfaces/ICar';

describe('Cars Model', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  it('cadastra um novo carro', async () => {
    const newCar = await carsModel.create(validCar);
			expect(newCar).to.be.deep.equal(carMockWithId);
  });

	it('retorna todos os carros', async () => {
		const cars = await carsModel.read();
		expect(cars).to.be.an('array');
    expect(cars).to.be.deep.equal([carMockWithId]);
	});

  // it('retorna o carro específico', async () => {
  //   const car = await carsModel.readOne(carMockWithId._id);
  //   expect(car).to.be.deep.equal(carMockWithId);
  // });

  it('retorna um erro ao passar um id inválido', async () => {
    try {
      await carsModel.readOne('id inválido');
    } catch (error: any) {
      expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
    }
  });
});