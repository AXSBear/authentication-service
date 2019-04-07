import { BaseEntityMapping } from '@inspe/core';
import { EntitySchema } from 'typeorm';
import { User } from '../Entities/User';

export const UserMapping = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    ...BaseEntityMapping,
    login: {
      type: 'varchar',
      unique: true,
      nullable: false,
    },
    password: {
      name: 'password',
      type: 'varchar',
      nullable: false,
    },
    birthDate: {
      name: 'birth_date',
      type: 'date',
      nullable: true,
    },
    email: {
      name: 'email',
      type: 'varchar',
      nullable: false,
    },
    lastLogin: {
      name: 'last_login',
      type: 'timestamp with time zone',
    },
  },
  relations: {
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: true,
      nullable: false,
      eager: true,
    },
  },
});
