import { describe, expect, it } from 'vitest';
import { tryCreateResource } from '@/api/utils';
import { ZodError } from 'zod';

describe('API Utils', () => {
  describe('tryCreateResource', () => {
    it('should return a 201 response with created resource for valid data', async () => {
      const mockCreateResource = async (resource: any) => {
        return { ...resource, id: 1 };
      };

      const resource = { name: 'Valid Resource' };

      const response = await tryCreateResource(mockCreateResource, resource);
      const responseData = await response.json();

      expect(response.status).toBe(201);
      expect(responseData).toHaveProperty('id');
      expect(responseData.name).toBe('Valid Resource');
    });

    it('should return a 400 response for Zod validation error', async () => {
      const mockCreateResource = async () => {
        throw new ZodError([]);
      };

      const resource = { name: '' }; // Invalid resource

      const response = await tryCreateResource(mockCreateResource, resource);

      expect(response.status).toBe(400);
    });

    it('should return a 500 response for non-validation errors', async () => {
      const mockCreateResource = async () => {
        throw new Error('Non-validation error');
      };

      const resource = { name: 'Valid Resource' };

      const response = await tryCreateResource(mockCreateResource, resource);

      expect(response.status).toBe(500);
    });
  });
});
