import { ZodError, ZodSafeParseResult } from 'zod';
import { statusCodes } from './statusCodes';
import { NextRequest } from 'next/server';

export const tryCreateResource = async <T>(createResource: (resource: T) => Promise<T>, resource: T): Promise<Response> => {
  try {
    const createdResource = await createResource(resource);
    return Response.json(createdResource, { status: statusCodes.CREATED });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({}, { status: statusCodes.BAD_REQUEST });
    } else {
      return Response.json({}, { status: statusCodes.INTERNAL_SERVER_ERROR });
    }
  }
};

export const fromZodParseResult = <T>(parseResult: ZodSafeParseResult<T>): Response => {
  return Response.json(
    {
      code: 'invalid query parameters',
      errors: parseResult.error?.issues,
    },
    { status: statusCodes.BAD_REQUEST },
  );
};

export interface IdRouteParams {
  params: Promise<{ id: string }>;
}

export const noContentResponse = (): Response => {
  return new Response(null, { status: statusCodes.NO_CONTENT });
};

export const tryUpdateResource = async <T>(
  request: NextRequest,
  route: IdRouteParams,
  updateResource: (resource: T) => Promise<void>,
): Promise<Response> => {
  const { id } = await route.params;

  // TODO: verify id is a valid uuid

  const data = await request.json();
  if (data.id !== id) {
    return Response.json(
      {
        code: 'id mismatch',
        errors: [{ message: 'id in body does not match id in path' }],
      },
      { status: statusCodes.BAD_REQUEST },
    );
  }
  try {
    await updateResource(data);
    return noContentResponse();
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({}, { status: statusCodes.BAD_REQUEST });
    } else {
      return Response.json({}, { status: statusCodes.INTERNAL_SERVER_ERROR });
    }
  }
};
