import { ServerBootstrap } from './bootstrap/server.bootstrap';

(async () => {
  const server = new ServerBootstrap();
  try {
    await server.initialize();
  } catch (error) {
    console.log(error);
  }
})();
