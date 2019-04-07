import {
  ArgumentNullException,
  BaseService,
  ConditionOperator,
  Filter,
  IEntityDao,
  LogicalOperator,
  NotFoundException,
  Query,
} from '@inspe/core';
import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { AuthModel } from '../../Common/Models/AuthModel';
import { RefreshTokenModel } from '../../Common/Models/RefreshTokenModel';
import { dependencyResolver } from '../../inversify.config';
import { Session } from '../../Models/Entities/Session';
import { User } from '../../Models/Entities/User';
import { TYPES } from '../../types';
import { IAuthService } from '../Services.Face/IAuthService';
import { ISessionService } from '../Services.Face/ISessionService';

@injectable()
export class JwtAuthService extends BaseService implements IAuthService {

  // FIXME Вынести в конфигуратор, использовать public\private keys
  private secret: string = 'secret';
  private refreshSecret: string = 'secret2';

  /**
   * Завршить сеанс пользователя
   */
  public async logOut(): Promise<void> {
    // TODO Добавить в Redis информацию об отыквленных токенах юзеров. Разослать событие о том, что все токены этого пользователя,
    // истекающие до определенной даты - тыквы. Удалить RefreshToken из хранилища(убить сессию)
    return undefined;
  }

  /**
   * Аутентификация пользователя
   * @param authModel - входная модель данных для аутентификации
   */
  public async login(authModel: AuthModel): Promise<any> {
    if (authModel === null || authModel === undefined) {
      throw new ArgumentNullException('authModel');
    }
    const user: User = await this.getUserByLogin(authModel.login);
    if (user.password !== authModel.password) {
      throw new Error('Incorrect username or password');
    }

    // TODO Обновить поле LastLogin, убивать предыдующую сессию.
    const payload = { id: user.id,
      login: user.login,
      role: user.role.code };
    const token: string = jwt.sign(payload, this.secret, { expiresIn: 300 });
    const refreshToken: string = jwt.sign(payload, this.refreshSecret, { expiresIn: 86400 });
    await JwtAuthService.createNewSession(user, refreshToken);
    return { token, refreshToken };
  }

  /**
   * Сохранить сессию в Redis
   * @param user
   * @param refreshToken
   */
  private static async createNewSession(user: User, refreshToken: string): Promise<void> {
    const sessionService: ISessionService = dependencyResolver.get<ISessionService>(TYPES.ISessionService);
    const newSession: Session = new Session();
    newSession.id = 'afaa3fa3-eb22-4bd5-b314-36f5c403be9c'; // FIXME Добавить генерацию UUID
    newSession.userId = user.id;
    newSession.refreshToken = refreshToken;
    await sessionService.saveSession(newSession);
  }

  /**
   * Обновить JWT токен
   * @param refreshModel - модель необходимых для обновления данных
   */
  public async refreshJwt(refreshModel: RefreshTokenModel): Promise<string> {
    if (refreshModel === null || refreshModel === undefined) {
      throw new ArgumentNullException('refreshModel');
    }
    const result = jwt.verify(refreshModel.refreshToken, this.refreshSecret);
    const sessionService: ISessionService = dependencyResolver.get<ISessionService>(TYPES.ISessionService);
    // TODO Сделать поиск refresh token во временном хранилище, если токен будет найден, то данные необходимого пользователя берем из БД
    // @ts-ignore
    const user: User = await this.getUserByLogin(result.login);
    const session = await sessionService.getUserSessions(user);
    if (!session) {
      throw new Error('Forbidden');
    }
    const payload = {
      id: user.id,
      login: user.login,
      role: user.role.code,
    };

    return jwt.sign(payload, this.secret, { expiresIn: 300 });
  }

  /**
   * Получить пользователя по логину
   * @param login
   */
  private async getUserByLogin(login: string): Promise<User> {
    const userDao: IEntityDao<User> = this.dao(User);
    if (userDao === null || userDao === undefined) {
      throw new NotFoundException('User Data Access Object Not found');
    }

    const filter = new Filter(LogicalOperator.And)
      .addValueEntry('login', ConditionOperator.Equal, login);
    const query = new Query(null, null, filter, null);

    const user: User[] = await userDao.select(User, null, query);
    if (user === null || user === undefined || user.length === 0) {
      throw new NotFoundException('Incorrect username or password');
    }
    return user[0];
  }
}
