import { CarFilter, CarSortColumns } from '@/domain/car.filter';
import { SortOrder } from '@/domain/utils';

export const carFilter = (data: Partial<CarFilter>) => {
  return {
    query: data.query || null,
    skip: data.skip || 0,
    take: data.take || 10,
    sortBy: data.sortBy || CarSortColumns.UPDATED_AT,
    sortOrder: data.sortOrder || SortOrder.DESC,
  };
};
