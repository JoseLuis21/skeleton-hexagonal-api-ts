import type IResult from '@modules/shared/application/result.interface';
import { type User } from '@modules/users/domain/user.model';

export function ResponseDto(traceId: string, data: User | User[] | null, total: number | null = null): IResult<User> {
  if (total != null || total === 0) {
    return {
      traceId,
      payload: { data, total },
    };
  }
  return { traceId, payload: { data } };
}
