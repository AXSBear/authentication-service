import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Запрос на авторизацию
 */
export class AuthModel {

  @ApiModelProperty({ description: 'Логин', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Логин обязательный параметр' })
  @IsString()
  public readonly login: string;

  @ApiModelProperty({ description: 'Пароль', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Пароль обязательный параметр' })
  @IsString()
  public readonly password: string;
}
