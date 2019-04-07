import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException, NotFoundException,
  NotImplementedException,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { dependencyResolver } from '../../../inversify.config';
import { Session } from '../../../Models/Entities/Session';
import { User } from '../../../Models/Entities/User';
import { IBaseCrudService } from '../../../Services/Services.Face/IBaseCrudService';
import { ISessionService } from '../../../Services/Services.Face/ISessionService';
import { TYPES } from '../../../types';
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
  public async getList(@Param('id') id: number): Promise<SessionDto[]> {
    if (id === null || id === undefined) {
      throw new BadRequestException('Parameter id can\'t be null');
    }
    const service = dependencyResolver.get<IBaseCrudService<User>>(TYPES.IService);
    const model: User = await service.getOne(User, id);
    if (!model) {
      throw new NotFoundException('User not found');
    }
    const sessionService: ISessionService = dependencyResolver.get<ISessionService>(TYPES.ISessionService);
    const userSession: Session = await sessionService.getUserSessions(model);
    if (!userSession) {
      return [];
    }
    return [new SessionDto(userSession)];
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
