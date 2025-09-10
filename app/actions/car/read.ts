import { Car } from '@/domain/car.model';
import { dbCarRead } from '@/storage/car/car.read';

export const readCar = async (id: string): Promise<Car> => {
  const car = await dbCarRead(id);
  return car;
};
