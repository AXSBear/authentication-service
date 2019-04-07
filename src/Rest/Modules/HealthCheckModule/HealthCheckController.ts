import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Жизнь')
@Controller('health')
export class HealthCheckController {

  @Get('check')
  @ApiOperation({
    title: 'Получить информацию о доступности сервиса',
  })
  @ApiOkResponse({ description: 'Жив' })
  public async get(): Promise<any> {
    return;
  }
}
