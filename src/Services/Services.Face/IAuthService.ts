import { IService } from '@inspe/core';
import { AuthModel } from '../../Common/Models/AuthModel';
import { RefreshTokenModel } from '../../Common/Models/RefreshTokenModel';

export interface IAuthService extends IService {
  login(authModel: AuthModel): Promise<string>;
  logOut(): Promise<void>;
  refreshJwt(refreshModel: RefreshTokenModel): Promise<string>;
}
