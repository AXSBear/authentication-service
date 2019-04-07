import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenModel {

  @ApiModelProperty({ description: 'Refresh token for JWT', required: true, type: String })
  @IsNotEmpty({ message: 'Refresh token for JWT обязательный параметр' })
  @IsString()
  public readonly refreshToken: string;
}
