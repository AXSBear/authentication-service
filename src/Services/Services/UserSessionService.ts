import { ArgumentNullException } from '@inspe/core';
import { injectable } from 'inversify';
import { RedisDataPersister } from '../../DataAccessLayer/Redis/RedisDataPersister';
import { dependencyResolver } from '../../inversify.config';
import { Session } from '../../Models/Entities/Session';
import { User } from '../../Models/Entities/User';
import { TYPES } from '../../types';
import { ISessionService } from '../Services.Face/ISessionService';

/**
 * Сервис для работы с сессиями пользователей
 */
@injectable()
export class UserSessionService implements ISessionService {

  /**
   * Закрыть сессию пользователя
   * @param session
   */
  public async closeSession(session: Session): Promise<boolean> {
    if (session === null || session === undefined) {
      throw new ArgumentNullException('session');
    }
    const redisStorage: RedisDataPersister = dependencyResolver.get<RedisDataPersister>(TYPES.Redis);
    return await redisStorage.deleteData(session.userId.toString());
  }

  /**
   * Получить сессию пользователя
   * @param user - пользователь
   */
  public async getUserSessions(user: User): Promise<Session> {
    if (user === null || user === undefined) {
      throw new ArgumentNullException('user');
    }
    const redisStorage: RedisDataPersister = dependencyResolver.get<RedisDataPersister>(TYPES.Redis);
    return await redisStorage.getData<Session>(user.id.toString());
  }

  /**
   * Сохраниь сессию пользоваеля
   * @param session - сессия
   */
  public async saveSession(session: Session): Promise<boolean> {
    if (session === null || session === undefined) {
      throw new ArgumentNullException('session');
    }
    const redisStorage: RedisDataPersister = dependencyResolver.get<RedisDataPersister>(TYPES.Redis);
    return await redisStorage.writeData<Session>(session.userId.toString(), session);
  }
}
