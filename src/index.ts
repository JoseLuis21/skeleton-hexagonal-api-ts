import { Server } from './internal/server/server';

(() => {
  const server = new Server();
  server
    .initialize()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
})();
