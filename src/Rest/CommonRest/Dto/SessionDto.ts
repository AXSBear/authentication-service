import { ApiModelProperty } from '@nestjs/swagger';
import { IsIP, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SessionDto {

  @ApiModelProperty({ description: 'Уникальный идентификатор сессии', required: true, type: 'int', example: 'afaa3fa3-eb22-4bd5-b314-36f5c403be9c' })
  @IsNotEmpty()
  @IsUUID()
  public readonly uuid: string;

  @ApiModelProperty({ description: 'Тип сессии', required: true, type: String, example: 'Browser' })
  @IsNotEmpty({ message: 'Тип сессии обязательный параметр' })
  @IsString()
  public readonly type: string;

  @ApiModelProperty({ description: 'IP Адрес', required: true, type: String, example: '127.0.0.1' })
  @IsNotEmpty({ message: 'IP Адрес' })
  @IsIP()
  public readonly ipAddress: string;

  @ApiModelProperty({ description: 'Идентификатор приложения установивший сессию', required: true, type: String, example: 'Printer Service' })
  @IsNotEmpty({ message: 'Идентификатор приложения обязательный параметр' })
  @IsString()
  public readonly application: string;
}
