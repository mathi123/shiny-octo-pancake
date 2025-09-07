import { describe, expect, it, vi } from 'vitest';
import { GET } from '@/api/cars/route';

vi.mock('@/actions/car/search', () => ({
  search: vi.fn().mockResolvedValue([]),
}));

describe('API Route - GET /api/cars', () => {
  it('returns 200 when params are valid (no params)', async () => {
    const request = {
      nextUrl: new URL('http://localhost/api/cars'),
    } as any;

    const response = await GET(request);

    expect(response.status).toBe(200);
  });

  it('returns 200 when valid query parameters are provided', async () => {
    const request = {
      nextUrl: new URL('http://localhost/api/cars?query=Tesla'),
    } as any;

    const response = await GET(request);

    expect(response.status).toBe(200);
  });

  it('returns 400 with validation errors when unexpected params are provided', async () => {
    const request = {
      nextUrl: new URL('http://localhost/api/cars?foo=bar'),
    } as any;

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.code).toBe('invalid query parameters');
    expect(Array.isArray(json.errors)).toBe(true);
  });
});
