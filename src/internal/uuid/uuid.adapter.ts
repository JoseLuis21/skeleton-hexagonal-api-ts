import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UuidAdapter {
  static getId(): string {
    return uuidv4();
  }
}
