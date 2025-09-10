import { dbCarDelete } from '@/storage/car/car.delete';

export const deleteCar = async (id: string): Promise<void> => {
  await dbCarDelete(id);
};
