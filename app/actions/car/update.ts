import { Car } from '@/domain/car.model';
import { carSchema } from '@/domain/car.validator';

export const update = async (car: Car): Promise<void> => {
  const validatedCar = carSchema.parse(car);
  console.log('Updating car in database', validatedCar);
};
