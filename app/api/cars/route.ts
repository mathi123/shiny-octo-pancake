import { type NextRequest } from 'next/server';
import { search } from '@/actions/car/search';
import { create } from '@/actions/car/create';
import { fromZodParseResult, tryCreateResource } from '@/api/utils';
import { carSearchParamsSchema } from '@/domain/car.searchParams';

export async function GET(request: NextRequest) {
  const carSearchParams = carSearchParamsSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!carSearchParams.success) {
    return fromZodParseResult(carSearchParams);
  }
  const result = await search(carSearchParams.data);
  return Response.json(result);
}

export async function POST(request: NextRequest) {
  const car = await request.json();
  return tryCreateResource(create, car);
}
