export interface IBootstrap {
  initialize(): Promise<Boolean | Error>;
}
