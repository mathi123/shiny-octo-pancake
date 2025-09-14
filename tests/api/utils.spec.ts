import { describe, expect, it } from 'vitest';
import { fromZodParseResult, getIdFromRoute, noContentResponse, tryCreateResource, tryUpdateResource } from '@/api/utils';
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

  describe('fromZodParseResult', () => {
    it('should return a 400 response with error details for invalid parse result', async () => {
      const mockParseResult = {
        success: false,
        error: {
          issues: [
            {
              message: 'Invalid input',
              path: ['name'],
            },
          ],
        },
      } as any;

      const response = fromZodParseResult(mockParseResult);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData).toEqual({
        code: 'invalid query parameters',
        errors: mockParseResult.error.issues,
      });
    });

    it('should return a 400 response with undefined errors when parse result has no error', async () => {
      const mockParseResult = {
        success: false,
        error: null,
      } as any;

      const response = fromZodParseResult(mockParseResult);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData).toEqual({
        code: 'invalid query parameters',
        errors: undefined,
      });
    });
  });

  describe('noContentResponse', () => {
    it('should return a 204 No Content response', () => {
      const response = noContentResponse();

      expect(response.status).toBe(204);
      expect(response.body).toBeNull();
    });
  });

  describe('getIdFromRoute', () => {
    it('should return the id from route params for valid UUID', async () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const mockRoute = {
        params: Promise.resolve({ id: validUUID }),
      };

      const result = await getIdFromRoute(mockRoute);

      expect(result).toBe(validUUID);
    });

    it('should throw error for invalid UUID', async () => {
      const invalidUUID = 'not-a-uuid';
      const mockRoute = {
        params: Promise.resolve({ id: invalidUUID }),
      };

      await expect(getIdFromRoute(mockRoute)).rejects.toThrow();
    });
  });

  describe('tryUpdateResource', () => {
    it('should return no content response for successful update', async () => {
      const mockRequest = {
        json: async () => ({ id: '123e4567-e89b-12d3-a456-426614174000', name: 'Updated Name' }),
      } as any;
      const mockRoute = {
        params: Promise.resolve({ id: '123e4567-e89b-12d3-a456-426614174000' }),
      };
      const mockUpdateResource = async (resource: any) => resource;

      const response = await tryUpdateResource(mockRequest, mockRoute, mockUpdateResource);

      expect(response.status).toBe(204);
      expect(response.body).toBeNull();
    });

    it('should return 400 response for id mismatch', async () => {
      const mockRequest = {
        json: async () => ({ id: 'different-id', name: 'Updated Name' }),
      } as any;
      const mockRoute = {
        params: Promise.resolve({ id: '123e4567-e89b-12d3-a456-426614174000' }),
      };
      const mockUpdateResource = async (resource: any) => resource;

      const response = await tryUpdateResource(mockRequest, mockRoute, mockUpdateResource);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData).toEqual({
        code: 'id mismatch',
        errors: [{ message: 'id in body does not match id in path' }],
      });
    });

    it('should return 400 response for Zod validation error', async () => {
      const mockRequest = {
        json: async () => ({ id: '123e4567-e89b-12d3-a456-426614174000', name: 'Updated Name' }),
      } as any;
      const mockRoute = {
        params: Promise.resolve({ id: '123e4567-e89b-12d3-a456-426614174000' }),
      };
      const mockUpdateResource = async () => {
        throw new ZodError([]);
      };

      const response = await tryUpdateResource(mockRequest, mockRoute, mockUpdateResource);

      expect(response.status).toBe(400);
    });

    it('should return 500 response for non-validation errors', async () => {
      const mockRequest = {
        json: async () => ({ id: '123e4567-e89b-12d3-a456-426614174000', name: 'Updated Name' }),
      } as any;
      const mockRoute = {
        params: Promise.resolve({ id: '123e4567-e89b-12d3-a456-426614174000' }),
      };
      const mockUpdateResource = async () => {
        throw new Error('Non-validation error');
      };

      const response = await tryUpdateResource(mockRequest, mockRoute, mockUpdateResource);

      expect(response.status).toBe(500);
    });

    it('should throw error for invalid UUID in route params', async () => {
      const mockRequest = {
        json: async () => ({ id: 'invalid-uuid', name: 'Updated Name' }),
      } as any;
      const mockRoute = {
        params: Promise.resolve({ id: 'invalid-uuid' }),
      };
      const mockUpdateResource = async (resource: any) => resource;

      await expect(tryUpdateResource(mockRequest, mockRoute, mockUpdateResource)).rejects.toThrow();
    });
  });
});
