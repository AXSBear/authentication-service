import { IEntity } from '@inspe/core';
import { Role } from './Role';

/**
 * Класс описывающий сущность "Пользователь"
 */
export class User implements IEntity {

  /**
   * Уникальный идентификатор пользователя
   */
  public id: number;

  /**
   * Электронная почта пользователя
   */
  public email: string;

  /**
   * Логин пользователя
   */
  public login: string;

  /**
   * Пароль пользователя
   */
  public password: string;

  /**
   * Дата рождения
   */
  public birthDate: Date;

  /**
   * Дата последнего входа
   */
  public lastLogin: Date;

  /**
   * Дата регистрации
   */
  public createdAt: Date;

  /**
   * Роль пользователя в системе
   */
  public role: Role;
}
