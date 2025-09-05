import { afterEach, describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

vi.mock('@/storage/car.repository', () => ({
  createCar: vi.fn(),
}));

import { create } from '@/lib/car.manager';
import { Car } from '@/models/car.model';
import { createCar } from '@/storage/car.repository';

describe('Car Manager', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('creates a car successfully with valid data and calls repository', async () => {
      const car: Car = {
        id: null,
        name: 'Test Car',
      };

      (createCar as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test Car',
      });

      const result = await create(car);

      expect(createCar).toHaveBeenCalledTimes(1);
      expect(createCar).toHaveBeenCalledWith({ id: null, name: 'Test Car' });
      expect(result).toEqual({ id: expect.any(String), name: 'Test Car' });
    });

    it('throws a ZodError if car name is invalid', async () => {
      const car: Car = {
        id: null,
        name: '',
      };

      await expect(create(car)).rejects.toBeInstanceOf(ZodError);
      expect(createCar).not.toHaveBeenCalled();
    });

    it('propagates repository errors after successful validation', async () => {
      const car: Car = {
        id: null,
        name: 'Valid Name',
      };

      (createCar as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('DB down'));

      await expect(create(car)).rejects.toThrow('DB down');
      expect(createCar).toHaveBeenCalledTimes(1);
    });
  });
});
