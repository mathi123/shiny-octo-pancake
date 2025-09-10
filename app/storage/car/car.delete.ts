import { getPrismaClient } from '@/storage/utils';

export const dbCarDelete = async (id: string): Promise<void> => {
  const prisma = getPrismaClient();
  await prisma.car.delete({
    where: { id },
  });
};
