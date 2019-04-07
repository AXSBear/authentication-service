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
import * as jwt from 'jsonwebtoken';
import { AuthModel } from '../../Common/Models/AuthModel';
import { RefreshTokenModel } from '../../Common/Models/RefreshTokenModel';
import { User } from '../../Models/Entities/User';
import { IAuthService } from '../Services.Face/IAuthService';

export class JwtAuthService extends BaseService implements IAuthService {

  private secret: string = 'secret';
  private refreshSecret: string = 'secret2';

  public async logOut(): Promise<void> {
    // TODO Добавить в Redis информацию об отыквленных токенах юзеров. Разослать событие о том, что все токены этого пользователя,
    // истекающие до определенной даты - тыквы. Удалить RefreshToken из хранилища(убить сессию)
    return undefined;
  }

  public async login(authModel: AuthModel): Promise<any> {
    if (authModel === null || authModel === undefined) {
      throw new ArgumentNullException('authModel');
    }

    const user: User = await this.getUserByLogin(authModel.login);

    if (user.password !== authModel.password) {
      throw new Error('Incorrect username or password');
    }

    // TODO Обновить поле LastLogin
    const payload = { id: user.id,
      login: user.login,
      role: user.role.code };
    const token: string = jwt.sign(payload, this.secret, { expiresIn: 300 });
    const refreshToken: string = jwt.sign(payload, this.refreshSecret, { expiresIn: 86400 });
    return { token, refreshToken };
  }

  public async refreshJwt(refreshModel: RefreshTokenModel): Promise<string> {
    if (refreshModel === null || refreshModel === undefined) {
      throw new ArgumentNullException('refreshModel');
    }
    // TODO Сделать поиск refresh token во временном хранилище, если токен будет найден, то необхоимого пользователя
    const user: User = await this.getUserByLogin('admin');
    const payload = { id: user.id,
      login: user.login,
      role: user.role.code };

    return jwt.sign(payload, this.secret, { expiresIn: 300 });
  }

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
