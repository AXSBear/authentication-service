import { Controller, Delete, Get, InternalServerErrorException, NotImplementedException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { SessionDto } from '../../CommonRest/Dto/SessionDto';

@ApiUseTags('Пользователи')
@Controller('user')
export class SessionController {

  @Get(':id/sessions')
  @ApiOperation({
    title: 'Получить список сессий пользователя',
    description: 'Дает возможнось получить список сессий пользователя отсортированный и отфильтрованный по указанным в запросе параметрам',
  })
  @ApiOkResponse({ description: 'Отфильтрованный и отсортированный список', type: SessionDto, isArray: true })
  public async getList(): Promise<SessionDto[]> {
    return [new SessionDto()];
  }

  @Delete(':id/sessions/:uuid')
  @ApiOperation({
    title: 'Прервать сессию',
    description: 'Дает возможнось прервать сессию пользователя по указанному иденификатору сессии',
  })
  public async delete(@Param('id') id: number, @Param('uuid') uuid: string): Promise<any> {
    throw new NotImplementedException();
  }
}
