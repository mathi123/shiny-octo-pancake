import { describe, expect, it } from 'vitest';
import { carSearchParamsSchema } from '@/domain/car.searchParams';

describe('carSearchParamsSchema', () => {
  it('should validate an empty object', () => {
    const result = carSearchParamsSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('should validate an object with a query string', () => {
    const result = carSearchParamsSchema.safeParse({ query: 'test' });
    expect(result.success).toBe(true);
  });

  it('should invalidate an object with a non-string query', () => {
    const result = carSearchParamsSchema.safeParse({ query: 123 });
    expect(result.success).toBe(false);
  });

  it('should invalidate an object with additional properties', () => {
    const result = carSearchParamsSchema.safeParse({ query: 'test', extra: 'value' });
    expect(result.success).toBe(false);
  });

  it('should invalidate an object with additional propertietesets', () => {
    const result = carSearchParamsSchema.safeParse({ qyd: 'hi' });
    expect(result.success).toBe(false);
  });
});
