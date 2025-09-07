import { Car } from '@/domain/car.model';
import { carSchema } from '@/domain/car.validator';
import { createCar } from '@/storage/car.repository';

export const create = async (car: Car): Promise<Car> => {
  const validatedCar = carSchema.parse(car);
  const result = await createCar(validatedCar);
  return result;
};
