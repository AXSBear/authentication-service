import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthModel } from '../../../Common/Models/AuthModel';

@Controller('auth')
@ApiUseTags('Аутентификация')
export class AuthNController {

  @Post()
  @ApiOperation({ title: 'Аутентификация', description: 'Выполняет аутентификацию пользователя в системе по логину и паролю' })
  public async login(@Body() request: AuthModel) {}

}
