import { afterEach, describe, expect, it, vi } from 'vitest';

// Mock the storage layer
vi.mock('@/storage/car/car.read', () => ({
  dbCarRead: vi.fn(),
}));

import { readCar } from '@/actions/car/read';
import { dbCarRead } from '@/storage/car/car.read';
import { car } from '../../builders/car.builder';

describe('readCar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns a car successfully when found', async () => {
    const carId = '550e8400-e29b-41d4-a716-446655440000';
    const expectedCar = car({
      id: carId,
    });

    // Mock the storage layer to return the car
    vi.mocked(dbCarRead).mockResolvedValueOnce(expectedCar);

    const result = await readCar(carId);

    expect(dbCarRead).toHaveBeenCalledTimes(1);
    expect(dbCarRead).toHaveBeenCalledWith(carId);
    expect(result).toEqual(expectedCar);
  });
});
