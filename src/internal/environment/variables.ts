import 'dotenv/config';
import { get } from 'env-var';

export const variablesEnvs = {
  PORT: get('PORT').required().asPortNumber(),
  MYSQL_HOST_READ_1: get('MYSQL_HOST_READ_1').required().asString(),
  MYSQL_HOST_WRITE_1: get('MYSQL_HOST_WRITE_1').required().asString(),
  MYSQL_HOST_READ_2: get('MYSQL_HOST_READ_2').required().asString(),
  MYSQL_HOST_WRITE_2: get('MYSQL_HOST_WRITE_2').required().asString(),
};
