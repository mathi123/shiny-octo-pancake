import { Car } from '@/domain/car.model';
import { CarSearchParams } from '@/domain/car.searchParams';

export const search = async (searchParams: CarSearchParams): Promise<Car[]> => {
  console.log('Searching for cars', searchParams);
  return [];
};
