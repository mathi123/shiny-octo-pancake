import { Car } from '@/models/car.model';

export const createCar = async (car: Car): Promise<Car> => {
  // TODO: Store car in database
  console.log('Creating car in database', car);
  return car;
};
