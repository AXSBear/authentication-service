import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetPageModel {

  @ApiModelProperty({ description: 'Пейджинг: пропустить указанное количество записей', required: false, type: Number })
  @IsInt()
  public skip?: number;

  @ApiModelProperty({ description: 'Пейджинг: загрузить не более указанного количества записей', required: false, type: Number })
  @IsInt()
  public take?: number;
}
