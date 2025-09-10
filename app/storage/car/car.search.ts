import { Car } from '@/domain/car.model';
import { CarFilter } from '@/domain/car.filter';
import { getPrismaClient } from '@/storage/utils';
import { Page } from '@/domain/page.model';
import { Prisma } from '@/storage/client/client';
import { dbCarToDomain } from './car.mappers';

export const filterToQuery = (filter: CarFilter): Prisma.CarWhereInput => {
  return {
    name: filter.query
      ? {
          contains: filter.query.trim(),
          mode: 'insensitive',
        }
      : undefined,
  };
};

export const dbCarSearch = async (filter: CarFilter): Promise<Page<Car>> => {
  const prisma = getPrismaClient();
  const whereClause = filterToQuery(filter);
  const total = await prisma.car.count({
    where: whereClause,
  });
  const cars = await prisma.car.findMany({
    where: whereClause,
    skip: filter.skip,
    take: filter.take,
    orderBy: filter.sortBy ? { [filter.sortBy]: filter.sortOrder } : undefined,
  });
  return {
    records: cars.map(dbCarToDomain),
    total,
  };
};
