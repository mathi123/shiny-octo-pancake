import { Car, carSchema } from '@/domain/car.model';
import { dbCarCreate } from '@/storage/car/car.create';

export const createCar = async (car: Car): Promise<Car> => {
  const validatedCar = carSchema.parse(car);
  const result = await dbCarCreate(validatedCar);
  return result;
};
