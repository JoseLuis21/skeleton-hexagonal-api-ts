import { Server } from './internal/server/server';

(async () => {
  const server = new Server();
  try {
    await server.initialize();
  } catch (error) {
    console.log(error);
  }
})();
