import { afterEach, describe, expect, it, vi } from 'vitest';

// Mock the storage layer
vi.mock('@/storage/car/car.search', () => ({
  dbCarSearch: vi.fn(),
}));

import { searchCar } from '@/actions/car/search';
import { dbCarSearch } from '@/storage/car/car.search';
import { CarSortColumns } from '@/domain/car.filter';
import { SortOrder } from '@/domain/utils';
import { car } from '../../builders/car.builder';
import { carFilter } from '../../builders/car-filter.builder';

describe('searchCar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns search results successfully', async () => {
    const filter = carFilter({
      query: 'test',
      skip: 0,
      take: 10,
      sortBy: CarSortColumns.NAME,
      sortOrder: SortOrder.ASC,
    });

    const expectedCars = [car({ id: '1', name: 'Test Car 1' }), car({ id: '2', name: 'Test Car 2' })];

    const expectedResult = {
      records: expectedCars,
      total: 2,
    };

    // Mock the storage layer to return the search results
    vi.mocked(dbCarSearch).mockResolvedValueOnce(expectedResult);

    const result = await searchCar(filter);

    expect(dbCarSearch).toHaveBeenCalledTimes(1);
    expect(dbCarSearch).toHaveBeenCalledWith(filter);
    expect(result).toEqual(expectedResult);
  });

  it('handles empty search results', async () => {
    const filter = carFilter({
      query: null,
      skip: 0,
      take: 24,
      sortBy: CarSortColumns.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    });

    const expectedResult = {
      records: [],
      total: 0,
    };

    // Mock the storage layer to return empty results
    vi.mocked(dbCarSearch).mockResolvedValueOnce(expectedResult);

    const result = await searchCar(filter);

    expect(dbCarSearch).toHaveBeenCalledTimes(1);
    expect(dbCarSearch).toHaveBeenCalledWith(filter);
    expect(result).toEqual(expectedResult);
  });

  it('passes filter with default values', async () => {
    const filter = carFilter({
      query: 'search term',
      skip: 0,
      take: 24,
      sortBy: CarSortColumns.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    });

    const expectedResult = {
      records: [car({ name: 'Search Result' })],
      total: 1,
    };

    // Mock the storage layer
    vi.mocked(dbCarSearch).mockResolvedValueOnce(expectedResult);

    const result = await searchCar(filter);

    expect(dbCarSearch).toHaveBeenCalledTimes(1);
    expect(dbCarSearch).toHaveBeenCalledWith(filter);
    expect(result).toEqual(expectedResult);
  });
});
