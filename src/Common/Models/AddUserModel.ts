import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class AddUserModel {

  @ApiModelProperty({ description: 'Логин', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Логин обязательный параметр' })
  @IsString()
  public login: string;

  @ApiModelProperty({ description: 'Пароль', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Пароль обязательный параметр' })
  @IsString()
  public password: string;

  @ApiModelProperty({ description: 'Идентификатор роли нового пользователя', required: true, type: Number, example: 1 })
  @IsNotEmpty({ message: 'Идентифкатор роли обязательный параметр' })
  @IsInt()
  @IsPositive()
  public roleId: number;
}
