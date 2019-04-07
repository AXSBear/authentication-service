import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthModel } from '../../../Common/Models/AuthModel';
import { RefreshTokenModel } from '../../../Common/Models/RefreshTokenModel';
import { dependencyResolver } from '../../../inversify.config';
import { IAuthService } from '../../../Services/Services.Face/IAuthService';
import { TYPES } from '../../../types';

@Controller('auth')
@ApiUseTags('Аутентификация')
export class AuthNController {

  @Post()
  @ApiOperation({ title: 'Аутентификация', description: 'Выполняет аутентификацию пользователя в системе по логину и паролю' })
  public async login(@Body() request: AuthModel) {
    if (request === null || request === undefined) {
      throw new BadRequestException();
    }
    const service: IAuthService = dependencyResolver.get<IAuthService>(TYPES.IAuthService);
    return await service.login(request);
  }

  @Post('/token')
  @ApiOperation({ title: 'Получение нового токена', description: 'Обновление access token при помощи refresh token' })
  public async refreshToken(@Body() refreshModel: RefreshTokenModel) {
    if (refreshModel === null || refreshModel === undefined) {
      throw new BadRequestException();
    }
    const service: IAuthService = dependencyResolver.get<IAuthService>(TYPES.IAuthService);
    return await service.refreshJwt(refreshModel);
  }
}
