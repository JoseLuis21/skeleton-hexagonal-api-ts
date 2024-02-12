import { UuidAdapter } from '@internal/uuid/uuid.adapter';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TraceLibrary {
  private static instance: TraceLibrary;
  private traceId: string = '';

  private constructor() {}

  public static getTraceId(): string {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!TraceLibrary.instance) {
      TraceLibrary.instance = new TraceLibrary();
      TraceLibrary.instance.traceId = UuidAdapter.getId();
    }
    return TraceLibrary.instance.traceId;
  }
}
