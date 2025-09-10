import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

// Mock the storage layer
vi.mock('@/storage/car/car.create', () => ({
  dbCarCreate: vi.fn(),
}));

import { createCar } from '@/actions/car/create';
import { Car } from '@/domain/car.model';
import { dbCarCreate } from '@/storage/car/car.create';

describe('createCar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('successful creation', () => {
    it('creates a car successfully with valid data and calls storage layer', async () => {
      const car: Car = {
        id: null,
        name: 'Test Car',
        createdAt: null,
        updatedAt: null,
      };

      const expectedResult: Car = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test Car',
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date('2025-01-01T00:00:00Z'),
      };

      // Mock the storage layer to return a successful result
      vi.mocked(dbCarCreate).mockResolvedValueOnce(expectedResult);

      const result = await createCar(car);

      expect(dbCarCreate).toHaveBeenCalledTimes(1);
      expect(dbCarCreate).toHaveBeenCalledWith(car);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('validation errors', () => {
    it('throws a ZodError if car name is empty', async () => {
      const car: Car = {
        id: null,
        name: '',
        createdAt: null,
        updatedAt: null,
      };

      await expect(createCar(car)).rejects.toBeInstanceOf(ZodError);
      expect(dbCarCreate).not.toHaveBeenCalled();
    });
  });
});
