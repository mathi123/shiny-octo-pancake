import { Car } from '@/domain/car.model';

export const car = (data: Partial<Car>) => {
  return {
    id: data.id || '550e8400-e29b-41d4-a716-446655440000',
    name: data.name || 'Car',
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  };
};
