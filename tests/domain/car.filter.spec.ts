import { describe, expect, it } from 'vitest';
import { carFilterSchema } from '@/domain/car.filter';

describe('carFilterSchema', () => {
  it('validates minimal required fields and applies defaults', () => {
    const result = carFilterSchema.safeParse({ query: null, skip: 0, take: 10 });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sortBy).toBe('updatedAt');
      expect(result.data.sortOrder).toBe('desc');
    }
  });

  it('validates when query is a string', () => {
    const result = carFilterSchema.safeParse({ query: 'test', skip: 5, take: 20 });
    expect(result.success).toBe(true);
  });

  it('invalidates when query is not string or null', () => {
    const result = carFilterSchema.safeParse({ query: 123, skip: 0, take: 10 });
    expect(result.success).toBe(false);
  });

  it('enforces skip and take boundaries', () => {
    expect(carFilterSchema.safeParse({ query: null, skip: -1, take: 10 }).success).toBe(false);
    expect(carFilterSchema.safeParse({ query: null, skip: 0, take: 101 }).success).toBe(false);
    expect(carFilterSchema.safeParse({ query: null, skip: 0, take: 0 }).success).toBe(true);
    expect(carFilterSchema.safeParse({ query: null, skip: 1, take: 100 }).success).toBe(true);
  });

  it('accepts valid sortBy and sortOrder values', () => {
    const result = carFilterSchema.safeParse({
      query: null,
      skip: 0,
      take: 10,
      sortBy: 'name',
      sortOrder: 'asc',
    });
    expect(result.success).toBe(true);
  });

  it('rejects additional properties due to strict schema', () => {
    const result = carFilterSchema.safeParse({ query: null, skip: 0, take: 10, extra: 'value' });
    expect(result.success).toBe(false);
  });
});
