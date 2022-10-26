import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/Cars.model';
import CarsService from '../../../services/Cars.service';
import { carMockWithId } from '../../mocks/Cars.mock';
import { validCar } from '../../../../__tests__/utils/CarsMock';

describe('Cars Service', () => {
	const carsModel = new CarsModel();
	const carsService = new CarsService(carsModel);

	before(() => {
		sinon.stub(carsModel, 'create').resolves(carMockWithId);
    sinon.stub(carsModel, 'read').resolves([carMockWithId]);
    sinon.stub(carsModel, 'readOne').onCall(0).resolves(carMockWithId).onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore()
	});

	it('cadastra um novo carro', async () => {
		const newCar = await carsService.create(validCar);

		expect(newCar).to.be.deep.equal(carMockWithId);
	});

	it('falha ao tentar cadastrar um novo carro com o array vazio', async () => {
		try {
			await carsService.create({} as any);
		} catch (error) {
			expect(error).to.be.instanceOf(ZodError);
		}
	});

  it('retorna todos os carros', async () => {
		const cars = await carsModel.read();
		expect(cars).to.be.an('array');
    expect(cars).to.be.deep.equal([carMockWithId]);
	});

  it('retorna o carro específico', async () => {
    const car = await carsService.readOne(carMockWithId._id);

    expect(car).to.be.deep.equal(carMockWithId);
  });

  it('retorna um erro ao passar um id inválido', async () => {
    try {
      // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
      await carsService.readOne(carMockWithId._id);
    } catch (error: any) {
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    }
  });
});