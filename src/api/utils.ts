import { ZodError } from 'zod';

export const tryCreateResource = async <T>(createResource: (resource: T) => Promise<T>, resource: T): Promise<Response> => {
  try {
    const createdResource = await createResource(resource);
    return Response.json(createdResource, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({}, { status: 400 });
    } else {
      return Response.json({}, { status: 500 });
    }
  }
};
