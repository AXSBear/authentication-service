import { TYPES as t } from '@inspe/core';
import { IAuthService } from './Services/Services.Face/IAuthService';
import { ISessionService } from './Services/Services.Face/ISessionService';

const TYPES = {
  IAuthService: 'IAuthService',
  Redis: 'Redis',
  ISessionService: 'ISessionService',
  ...t,
};

export { TYPES };
