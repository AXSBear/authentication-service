import { ApiModelProperty } from '@nestjs/swagger';
import { GetPageModel } from './GetPageModel';

export class GetParamsModel extends GetPageModel {

  @ApiModelProperty({ description: 'Объект фильтрации клиентов', required: false, type: Object })
  public filter: any;
  @ApiModelProperty({ description: 'Объект сортировки клиентов', required: false, type: Object })
  public sort: any;
}
