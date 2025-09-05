import { Car } from '@/models/car.model';
import { carSchema } from '@/shared/car.validator';
import { createCar } from '@/storage/car.repository';

export const create = async (car: Car): Promise<Car> => {
  const validatedCar = carSchema.parse(car);
  const result = await createCar(validatedCar);
  return result;
};
