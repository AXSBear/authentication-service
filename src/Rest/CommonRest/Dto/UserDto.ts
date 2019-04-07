import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { User } from '../../../Models/Entities/User';

export class UserDto {

  @ApiModelProperty({ description: 'Уникальный идентификатор заявки', required: true, type: 'int', example: 42 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public readonly id: number;

  @ApiModelProperty({ description: 'Логин', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Логин обязательный параметр' })
  @IsString()
  public readonly login: string;

  @ApiModelProperty({ description: 'Электронная почта пользователя', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Электронная почта обязательный параметр' })
  @IsEmail()
  public readonly email: string;

  @ApiModelProperty({ description: 'Дата рождения', type: Date, example: '12.12.1994' })
  @IsDate()
  public readonly birthDate: Date;

  @ApiModelProperty({ description: 'Дата последнего входа', required: true, type: Date, example: '12.12.1994' })
  @IsNotEmpty({ message: 'Дата последнего входа обязательный параметр' })
  @IsDate()
  public readonly lastLogin: Date;

  @ApiModelProperty({ description: 'Дата регистрации', required: true, type: Date, example: '12.12.1994' })
  @IsNotEmpty({ message: 'Дата регистрации обязательный параметр' })
  @IsDate()
  public readonly createdAt: Date;

  public constructor(userEntity: User) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.login = userEntity.login;
    this.birthDate = userEntity.birthDate;
    this.lastLogin = userEntity.lastLogin;
    this.createdAt = userEntity.createdAt;
  }
}
