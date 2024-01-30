import { variablesEnvs } from './internal/environment/variables';
import { Server } from './internal/server/server';

(() => {
  const server = new Server(variablesEnvs.PORT);
  server
    .initialize()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
})();
