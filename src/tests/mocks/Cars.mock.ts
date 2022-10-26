import { ICar } from '../../interfaces/ICar';

// const carMock:ICar = {
//   model: 'Uno da Escada',
//   year: 1963,
//   color: 'red',
//   buyValue: 3500,
//   seatsQty: 2,
//   doorsQty: 2
// };

const carMockWithId:ICar & { _id:string } = {
  _id: '1',
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

export { carMockWithId };