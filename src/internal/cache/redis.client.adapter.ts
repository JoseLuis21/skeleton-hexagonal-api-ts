import Redis from 'ioredis';
import { variablesEnvs } from '../environment/variables';

type CacheValue = Record<string, unknown> | number | string | boolean;

export class RedisClientAdapter {
  public readonly client;
  constructor() {
    this.client = new Redis({
      connectionName: 'hexagonal-cache',
      host: variablesEnvs.HOST_REDIS,
      port: variablesEnvs.PORT_REDIS,
      connectTimeout: 500,
      maxRetriesPerRequest: 1,
    });

    this.client.on('error', (error) => {
      console.error(`Redis client error`, error);
    });
  }

  async connectIfNecessary(): Promise<void> {
    console.log(this.client.status);
    if (this.client.status === 'ready') {
      return;
    }

    await this.client.connect();
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.connectIfNecessary();
      await this.client.ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  async set(key: string, value: CacheValue, expirationInS?: number): Promise<void> {
    await this.connectIfNecessary();

    const stringifiedValue = typeof value === 'string' ? value : this.stringifyValueForStoring(value);

    if (expirationInS !== undefined) {
      await this.client.set(key, stringifiedValue, 'EX', expirationInS);
      return;
    }
    await this.client.set(key, stringifiedValue);
  }

  async get(key: string): Promise<CacheValue | null> {
    await this.connectIfNecessary();
    const value = await this.client.get(key);

    if (value == null) {
      return null;
    }

    return this.transformValueFromStorageFormat(value);
  }

  private stringifyValueForStoring(value: CacheValue): string {
    return JSON.stringify(value);
  }

  private transformValueFromStorageFormat(value: string): CacheValue {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
}
