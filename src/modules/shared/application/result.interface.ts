export default interface IResult<T> {
  traceId: string;
  payload: {
    data: T | T[] | null;
    total?: number;
  };
}
