import type { NextRequest } from 'next/server';
import { IdRouteParams, getIdFromRoute, noContentResponse, tryUpdateResource } from '@/api/utils';
import { deleteCar } from '@/actions/car/delete';
import { updateCar } from '@/actions/car/update';
import { readCar } from '@/actions/car/read';

export async function GET(request: NextRequest, route: IdRouteParams) {
  const id = await getIdFromRoute(route);
  const car = await readCar(id);
  return Response.json(car);
}

export async function PUT(request: NextRequest, route: IdRouteParams) {
  return tryUpdateResource(request, route, updateCar);
}

export async function DELETE(request: NextRequest, route: IdRouteParams) {
  const id = await getIdFromRoute(route);
  await deleteCar(id);
  return noContentResponse();
}
