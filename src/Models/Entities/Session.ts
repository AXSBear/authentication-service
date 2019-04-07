import { IEntity } from '@inspe/core';

/**
 * Класс описывающий сессию пользователя
 */
export class Session implements IEntity {

  /**
   * Уникальный идентифкатор сессии
   */
  public id: string;

  /**
   * Токен сессии
   */
  public refreshToken: string;

  /**
   * Идентификатор пользователя, к которому относится сессия
   */
  public userId: number;

  /**
   * Тип сессии
   */
  public type: string;

  /**
   * IP адрес, с котоого была установлена сессия
   */
  public ipAddress: string;

  /**
   * Приложение усановившее сессию
   */
  public application: string;
}
