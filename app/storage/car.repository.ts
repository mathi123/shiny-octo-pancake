import { Car } from '@/domain/car.model';

export const createCar = async (car: Car): Promise<Car> => {
  console.log('Creating car in database', car);
  return car;
};
