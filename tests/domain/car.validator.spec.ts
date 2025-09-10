import { describe, expect, it } from 'vitest';
import { carSchema } from '@/domain/car.model';

describe('carSchema', () => {
  it('parses a valid car with id and name', () => {
    const result = carSchema.safeParse({ id: '123e4567-e89b-12d3-a456-426614174000', name: 'Tesla' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ id: '123e4567-e89b-12d3-a456-426614174000', name: 'Tesla', createdAt: null, updatedAt: null });
    }
  });

  it('allows null id', () => {
    const result = carSchema.safeParse({ id: null, name: 'Volvo' });
    expect(result.success).toBe(true);
  });

  it('fails when id is missing', () => {
    const result = carSchema.safeParse({ name: 'BMW' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(true);
    }
  });

  it('fails when id has wrong type', () => {
    const result = carSchema.safeParse({ id: 123, name: 'Audi' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(true);
    }
  });

  it('fails when name is empty', () => {
    const result = carSchema.safeParse({ id: 'x', name: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(true);
    }
  });

  it('fails when name exceeds 100 chars', () => {
    const result = carSchema.safeParse({ id: 'x', name: 'a'.repeat(101) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(true);
    }
  });

  it('fails when name is missing', () => {
    const result = carSchema.safeParse({ id: 'x' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(true);
    }
  });
});
