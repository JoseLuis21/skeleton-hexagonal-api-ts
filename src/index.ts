import { RedisClientAdapter } from '@internal/cache/redis.client.adapter';
import { variablesEnvs } from '@internal/environment/variables';
import { Server } from '@internal/server/server';

(() => {
  const redisClientAdapter = new RedisClientAdapter();
  const server = new Server(variablesEnvs.PORT, variablesEnvs.HOST, variablesEnvs.JWT_SECRET, redisClientAdapter);
  server
    .initialize()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
})();
