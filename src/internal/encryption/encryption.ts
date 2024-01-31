import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class Encryption {
  public hash(text: string): string {
    const salt = genSaltSync();
    return hashSync(text, salt);
  }

  public compare(text: string, hashed: string): boolean {
    return compareSync(text, hashed);
  }
}
