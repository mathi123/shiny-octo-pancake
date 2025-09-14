import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

// Mock the storage layer
vi.mock('@/storage/car/car.create', () => ({
  dbCarCreate: vi.fn(),
}));

import { createCar } from '@/actions/car/create';
import { dbCarCreate } from '@/storage/car/car.create';
import { car } from '../../builders/car.builder';

describe('createCar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('successful creation', () => {
    it('creates a car successfully with valid data and calls storage layer', async () => {
      const inputCar = car({
        name: 'Test Car',
      });

      const expectedResult = car({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test Car',
      });

      // Mock the storage layer to return a successful result
      vi.mocked(dbCarCreate).mockResolvedValueOnce(expectedResult);

      const result = await createCar(inputCar);

      expect(dbCarCreate).toHaveBeenCalledTimes(1);
      expect(dbCarCreate).toHaveBeenCalledWith(inputCar);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('validation errors', () => {
    it('validation is called', async () => {
      const inputCar = car({});
      inputCar.name = '';

      await expect(createCar(inputCar)).rejects.toBeInstanceOf(ZodError);
      expect(dbCarCreate).not.toHaveBeenCalled();
    });
  });
});
