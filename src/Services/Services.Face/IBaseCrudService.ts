import { IEntity, IQuery, IService } from '@inspe/core';

/**
 * Описание сервиса с базовым функционалом CRUD
 */
export interface IBaseCrudService<TEntity extends IEntity> extends IService {

  /**
   * Получить список всех или отфильтрованых сущностей
   * @param type - указатель на тип сущности
   * @param query - параметры запроса
   */
  getList(type: (new () => TEntity), query?: IQuery): Promise<TEntity[]>;

  /**
   * Получить сущность по идентификатору
   * @param type - указатель на тип сущности
   * @param id - идентификатор сущности
   */
  getOne(type: (new () => TEntity), id: number): Promise<TEntity>;

  /**
   * Сохранить новую сущность
   * @param type - тип сущности
   * @param entityModel - входящая модель сущности
   */
  create(type: (new () => TEntity), entityModel: any): Promise<TEntity>;

  /**
   * Обновить сущность
   * @param type - указатель на тип сущности
   * @param entity - обновляемый объект сущности
   */
  update(type: (new () => TEntity), entity: TEntity): Promise<TEntity>;

  /**
   * Удалить сущность по идентификатору
   * @param type - указатель на тип сущности
   * @param id - идентификатор удаляяемой сущности
   */
  delete(type: (new () => TEntity), id: number): Promise<void>;
}
