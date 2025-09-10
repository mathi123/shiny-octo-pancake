import { afterEach, describe, expect, it, vi } from 'vitest';

// Mock the storage layer
vi.mock('@/storage/car/car.delete', () => ({
  dbCarDelete: vi.fn(),
}));

import { deleteCar } from '@/actions/car/delete';
import { dbCarDelete } from '@/storage/car/car.delete';

describe('deleteCar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('successful deletion', () => {
    it('deletes a car successfully and calls storage layer', async () => {
      const carId = '550e8400-e29b-41d4-a716-446655440000';

      // Mock the storage layer to resolve successfully
      vi.mocked(dbCarDelete).mockResolvedValueOnce(undefined);

      await deleteCar(carId);

      expect(dbCarDelete).toHaveBeenCalledTimes(1);
      expect(dbCarDelete).toHaveBeenCalledWith(carId);
    });
  });
});
