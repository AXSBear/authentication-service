import { IEntity } from '@inspe/core';

export class Role implements IEntity {
  /**
   * Уникальный идентификатор роли
   */
  public id: number;

  /**
   * Название роли
   */
  public name: string;

  /**
   * Системный код роли
   */
  public code: string;
}
