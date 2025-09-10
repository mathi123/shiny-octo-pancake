import { describe, expect, it } from 'vitest';
import { filterToQuery } from '@/storage/car/car.search';
import { CarFilter, CarSortColumns } from '@/domain/car.filter';
import { SortOrder } from '@/domain/utils';

describe('filterToQuery', () => {
  it('returns empty where clause when query is null', () => {
    const filter: CarFilter = {
      query: null,
      skip: 0,
      take: 10,
      sortBy: CarSortColumns.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    };

    const result = filterToQuery(filter);

    expect(result).toEqual({
      name: undefined,
    });
  });

  it('returns where clause with name filter when query is provided', () => {
    const filter: CarFilter = {
      query: 'Tesla',
      skip: 0,
      take: 10,
      sortBy: CarSortColumns.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    };

    const result = filterToQuery(filter);

    expect(result).toEqual({
      name: {
        contains: 'Tesla',
        mode: 'insensitive',
      },
    });
  });

  it('trims whitespace from query', () => {
    const filter: CarFilter = {
      query: '  Tesla  ',
      skip: 0,
      take: 10,
      sortBy: CarSortColumns.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    };

    const result = filterToQuery(filter);

    expect(result).toEqual({
      name: {
        contains: 'Tesla',
        mode: 'insensitive',
      },
    });
  });

  it('returns where clause with empty string when query is only whitespace', () => {
    const filter: CarFilter = {
      query: '   ',
      skip: 0,
      take: 10,
      sortBy: CarSortColumns.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    };

    const result = filterToQuery(filter);

    expect(result).toEqual({
      name: {
        contains: '',
        mode: 'insensitive',
      },
    });
  });

  it('returns where clause with case insensitive search', () => {
    const filter: CarFilter = {
      query: 'tesla',
      skip: 0,
      take: 10,
      sortBy: CarSortColumns.UPDATED_AT,
      sortOrder: SortOrder.DESC,
    };

    const result = filterToQuery(filter);

    expect(result).toEqual({
      name: {
        contains: 'tesla',
        mode: 'insensitive',
      },
    });
  });
});
