import { Car } from '@/domain/car.model';
import { getPrismaClient } from '@/storage/utils';
import { dbCarToDomain } from './car.mappers';

export const dbCarRead = async (id: string): Promise<Car> => {
  const prisma = getPrismaClient();
  const car = await prisma.car.findUniqueOrThrow({
    where: { id },
  });
  return dbCarToDomain(car);
};
