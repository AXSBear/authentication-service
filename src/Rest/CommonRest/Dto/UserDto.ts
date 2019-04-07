import { User } from '../../../Models/Entities/User';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {

  public id: number;

  @ApiModelProperty({ description: 'Электронная почта пользователя', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Электронная почта обязательный параметр' })
  @IsEmail()
  public email: string;

  @ApiModelProperty({ description: 'Логин', required: true, type: String, example: 'admin' })
  @IsNotEmpty({ message: 'Логин обязательный параметр' })
  @IsString()
  public login: string;

  @ApiModelProperty({ description: 'Дата рождения', type: Date, example: '12.12.1994' })
  @IsDate()
  public birthDate: Date;

  @ApiModelProperty({ description: 'Дата последнего входа', required: true, type: Date, example: '12.12.1994' })
  @IsNotEmpty({ message: 'Дата последнего входа обязательный параметр' })
  @IsDate()
  public lastLogin: Date;

  @ApiModelProperty({ description: 'Дата регистрации', required: true, type: Date, example: '12.12.1994' })
  @IsNotEmpty({ message: 'Дата регистрации обязательный параметр' })
  @IsDate()
  public createdAt: Date;

  public constructor(userEntity: User) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.login = userEntity.login;
    this.birthDate = userEntity.birthDate;
    this.lastLogin = userEntity.lastLogin;
    this.createdAt = userEntity.createdAt;
  }
}
