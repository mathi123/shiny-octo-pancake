import { Car } from '@/domain/car.model';
import { CarFilter } from '@/domain/car.filter';
import { Page } from '@/domain/page.model';
import { dbCarSearch as searchStorage } from '@/storage/car/car.search';

export const searchCar = async (filter: CarFilter): Promise<Page<Car>> => {
  return searchStorage(filter);
};
