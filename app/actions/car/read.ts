import { Car } from '@/domain/car.model';
import { dbCarRead } from '@/storage/car/car.read';

export const readCar = async (id: string): Promise<Car> => {
  return await dbCarRead(id);
};
