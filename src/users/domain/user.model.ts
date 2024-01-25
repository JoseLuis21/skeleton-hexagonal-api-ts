export class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
