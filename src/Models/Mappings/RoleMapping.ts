import { BaseCodedEntityMapping, BaseEntityMapping, BaseNamedEntity } from '@inspe/core';
import { EntitySchema } from 'typeorm';
import { Role } from '../Entities/Role';

export const RoleMapping = new EntitySchema<Role>({
  name: 'Role',
  tableName: 'roles',
  columns: {
    ...BaseEntityMapping,
    ...BaseNamedEntity,
    ...BaseCodedEntityMapping,
  },
});
