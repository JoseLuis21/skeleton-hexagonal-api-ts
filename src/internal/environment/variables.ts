import 'dotenv/config';
import { get } from 'env-var';

export const variablesEnvs = {
  HOST: get('HOST').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  HOST_REDIS: get('HOST_REDIS').required().asString(),
  PORT_REDIS: get('PORT_REDIS').required().asPortNumber(),
  RATE_LIMIT: get('RATE_LIMIT').required().asInt(),
  MYSQL_HOST_READ_1: get('MYSQL_HOST_READ_1').required().asString(),
  MYSQL_HOST_WRITE_1: get('MYSQL_HOST_WRITE_1').required().asString(),
  MYSQL_HOST_READ_2: get('MYSQL_HOST_READ_2').required().asString(),
  MYSQL_HOST_WRITE_2: get('MYSQL_HOST_WRITE_2').required().asString(),
};
