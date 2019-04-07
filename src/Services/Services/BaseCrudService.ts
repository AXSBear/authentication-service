import {
  ArgumentNullException,
  BaseService,
  IEntity,
  IEntityDao,
  IQuery,
  NotImplementedException,
  Query,
} from '@inspe/core';
import { injectable } from 'inversify';
import { IBaseCrudService } from '../Services.Face/IBaseCrudService';

/**
 * Сервис базовых CRUD операций над сущностями
 */
@injectable()
export class BaseCrudService<TEntity extends IEntity> extends BaseService implements IBaseCrudService<TEntity> {

  /**
   * Сохранить новую сущность
   * @param type - указатель на тип сущности
   * @param entity - сохраняемая сущность
   */
  public async create(type: (new () => TEntity), entity: TEntity): Promise<TEntity> {
    if (entity === null || entity === undefined) {
      throw new ArgumentNullException('entity');
    }
    const entityDao = await this.provider.getEntityDao<TEntity>(type);
    return await entityDao.save(entity);
  }

  /**
   * Удалить сущность по идентификатору
   * @param type - указатель на тип сущности
   * @param id - идентификатор сущности
   */
  public async delete(type: (new () => TEntity), id: number): Promise<void> {
    if (id === null || id === undefined) {
      throw new ArgumentNullException('id');
    }
    const entityDao = await this.provider.getEntityDao<TEntity>(type);
    const entity = await entityDao.select(type, id);
    if (!entity) {
      throw new Error(`Сущность с идентифкатором ${id} не найдена в системе`); // TODO заменить на NotFoundException из Core
    }
    return await entityDao.delete(type, entity);
  }

  /**
   * Получить список всех или отфильтрованых сущностей
   * @param type - указатель на тип сущности
   * @param query - параметры запроса
   */
  public async getList(type: (new () => TEntity), query?: IQuery): Promise<TEntity[]> {
    return this.dao<TEntity>(type).select(type, null, query || Query.empty);
  }

  /**
   * Получить сущность по идентификатору
   * @param type - указатель на тип сущности
   * @param id - идентификатор сущности
   */
  public async getOne(type: (new () => TEntity), id: number): Promise<TEntity> {
    if (id === null || id === undefined) {
      throw new ArgumentNullException('id');
    }
    const entityDao: IEntityDao<TEntity> = await this.dao<TEntity>(type);
    return entityDao.select(type, id);
  }

  /**
   * Обновить сущность
   * @param type - указатель на тип сущности
   * @param entity - объект сущности
   */
  public async update(type: (new () => TEntity), entity: TEntity): Promise<TEntity> {
    if (entity === null || entity === undefined) {
      throw new ArgumentNullException('entity');
    }
    const entityDao = await this.dao<TEntity>(type);
    const oldEntity = await entityDao.select(type, entity.id);
    if (!oldEntity) {
      throw new Error(`Сущность с идентифкатором ${entity.id} не найдена в системе`); // TODO заменить на NotFoundException из Core
    }
    throw new NotImplementedException();
  }
}
