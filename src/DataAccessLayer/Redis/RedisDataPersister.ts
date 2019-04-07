import { ClientOpts, createClient, RedisClient } from 'redis';
import { promisify } from 'util';

export class RedisDataPersister {
  /**
   * Redis client
   */
  private readonly _redisClient: RedisClient;

  public constructor() {

    // FIXME Брать настройки подключения из конфига
    const connectionOptions: ClientOpts = { host: '10.0.5.231', port: 10101 }; // configs.getRedisOpts();

    console.log(`Redis connection options: ${JSON.stringify(connectionOptions)}`);

    this._redisClient = createClient(connectionOptions);

    this._redisClient.on('connect', () => {
      console.log(`Connected to redis`);
    });
    this._redisClient.on('error', (err) => {
      console.error(`Error: ${err}`);
    });
    this._redisClient.on('end', () => {
      console.log(`An established Redis server connection has closed.`);
    });
  }

  /**
   * Write data to Redis key - value
   * @param key - Key
   * @param value - Value
   */
  public async writeData<TEntity>(key: string, value: TEntity): Promise<boolean> {
    const setMethod = promisify(this._redisClient.set.bind(this._redisClient));
    const serializedData: string = JSON.stringify(value);
    try {
      await setMethod(key, serializedData);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  public async writeInSet<TEntity>(set: string, value: TEntity): Promise<boolean> {
    const saddMethod = promisify(this._redisClient.sadd.bind(this._redisClient));
    const serializedData: string = JSON.stringify(value);
    try {
      await saddMethod(set, serializedData);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  /**
   * Get list of hash set keys
   */
  public async getDataKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return this._redisClient.keys('*', (err, replies) => {
        if (err) return reject(err);
        return resolve(replies);
      });
    });
  }

  /**
   * Get data from redis DB by hash
   * @param key - Key for data
   */
  public async getData<TEntity>(key: string): Promise<TEntity> {
    return new Promise((resolve, reject) => {
      return this._redisClient.get(key, (err, result) => {
        if (err) return reject(err);
        const entity: TEntity = JSON.parse(result);
        return resolve(entity);
      });
    });
  }

  /**
   * Get all data
   */
  public async getAllData<TEntity>(): Promise<TEntity[]> {
    const keys: string[] = await this.getDataKeys();
    const promises: Promise<TEntity>[] = keys.map(k => this.getData<TEntity>(k));
    return await Promise.all(promises);
  }

  /**
   * Delete one data record
   * @param {string} key - hash key for data
   */
  public async deleteData(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!key) reject();
      return this._redisClient.del(key, (err, result) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }

  public async setTTL(key: string): Promise<boolean> {
    /*return new Promise((resolve, reject) => {
      return this._redisClient.expire(key, this.configs.sessionInactivityTime, (err, reply) => {
        if (err) return reject(err);
        return resolve(true);
      });
    });*/
    return true;
  }

  public async getDataTTLUp<TEntity>(key: string): Promise<TEntity> {
    const data: TEntity = await this.getData<TEntity>(key);
    if (data) {
      await this.setTTL(key);
    }
    return data;
  }
}
