import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
// import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/Cars.model';
import CarsService from '../../../services/Cars.service';
import { carMockWithId } from '../../mocks/Cars.mock';
import { validCar } from '../../../../__tests__/utils/CarsMock';

describe('Cars Service', () => {
	const carsModel = new CarsModel();
	const carsService = new CarsService(carsModel);

	before(() => {
		sinon.stub(carsModel, 'create').resolves(carMockWithId);
	});

	after(() => {
		sinon.restore()
	});

	describe('cadastra um novo carro', () => {
		it('cria com sucesso', async () => {
			const frameCreated = await carsService.create(validCar);

			expect(frameCreated).to.be.deep.equal(carMockWithId);
		});

		it('falha ao tentar criar', async () => {
			try {
				await carsService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});
});