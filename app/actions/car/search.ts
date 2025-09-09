import { Car } from '@/domain/car.model';
import { CarSearchParams } from '@/domain/car.searchParams';
import { getPrismaClient } from '@/storage/utils';

export const search = async (searchParams: CarSearchParams): Promise<Car[]> => {
  console.log('Searching for cars', searchParams);
  const prisma = getPrismaClient();
  const cars = await prisma.car.findMany();
  return cars;
};
