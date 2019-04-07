import {
  BadRequestException,
  Body,
  Controller,
  Get, InternalServerErrorException,
  NotFoundException, NotImplementedException,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { IBaseCrudService } from 'src/Services/Services.Face/IBaseCrudService';
import { AddUserModel } from '../../../Common/Models/AddUserModel';
import { dependencyResolver } from '../../../inversify.config';
import { User } from '../../../Models/Entities/User';
import { TYPES } from '../../../types';
import { UserDto } from '../../CommonRest/Dto/UserDto';
import { IBaseController } from '../../CommonRest/IBaseController';

@ApiUseTags('Пользователи')
@Controller('user')
export class UserController implements IBaseController {

  /*@Post()
  @ApiOperation({
    title: 'Создать',
    description: 'Создает сущность с указанными параметрами',
  })
  @ApiOkResponse({ description: 'Созданная сущность', type: UserDto })*/
  public async create(@Body() model: AddUserModel): Promise<UserDto> {
    throw new NotImplementedException();
  }

  /*@Delete(':id')
  @ApiOperation({
    title: 'Удалить',
    description: 'Дает возможнось удалить сущность по указанному иденификатору сущости',
  })*/
  public async delete(@Param('id') id: number): Promise<any> {
    throw new NotImplementedException();
  }

  @Get(':id')
  @ApiOperation({
    title: 'Получить сущность',
    description: 'Дает возможнось получить сущность по указанному в запросе идентификатору',
  })
  @ApiOkResponse({ description: 'Сущность', type: UserDto })
  public async get(@Param('id') id: number): Promise<UserDto> {
    if (id === null || id === undefined) {
      throw new BadRequestException('Parameter id can\'t be null');
    }

    const service = dependencyResolver.get<IBaseCrudService<User>>(TYPES.IService);

    const model: User = await service.getOne(User, id);
    if (model === null || model === undefined) {
      throw new NotFoundException('user not found');
    }

    return new UserDto(model);
  }

  @Get()
  @ApiOperation({
    title: 'Получить список',
    description: 'Дает возможнось получить список отсортированный и отфильтрованный по указанным в запросе параметрам',
  })
  @ApiOkResponse({ description: 'Отфильтрованный и отсортированный список', type: UserDto, isArray: true })
  public async getList(): Promise<UserDto[]> {
    const service = dependencyResolver.get<IBaseCrudService<User>>(TYPES.IService);
    const models: User[] = await service.getList(User);
    if (models == null || models === undefined) {
      throw new InternalServerErrorException();
    }
    return models.map((item: User) => new UserDto(item));
  }

  /*@Put()
  @ApiOperation({
    title: 'Изменить',
    description: 'Дает возможнось изменить экземпляр сущности',
  })
  @ApiOkResponse({ description: 'Обновленный', type: UserDto })*/
  public async update(@Param('id') id: number, @Body() model: any): Promise<UserDto> {
    throw new NotImplementedException();
  }
}
