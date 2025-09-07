import type { NextRequest } from 'next/server';
import { IdRouteParams, noContentResponse, tryUpdateResource } from '@/api/utils';
import { deleteCar } from '@/actions/car/delete';
import { update } from '@/actions/car/update';

export async function GET(request: NextRequest, route: IdRouteParams) {
  const { id } = await route.params;
  console.info(id);
  return Response.json([]);
}

export async function PUT(request: NextRequest, route: IdRouteParams) {
  return tryUpdateResource(request, route, update);
}

export async function DELETE(request: NextRequest, route: IdRouteParams) {
  const { id } = await route.params;
  await deleteCar(id);
  return noContentResponse();
}
