import { create } from '@/lib/car.manager';
import { tryCreateResource } from '@/api/utils';

export async function POST(request: Request) {
  const car = await request.json();
  return tryCreateResource(create, car);
}
