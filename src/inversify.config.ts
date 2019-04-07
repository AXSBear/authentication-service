import { baseResolver, Container, DataAccessProvider, IDataAccessProvider } from '@inspe/core';
import { EntitySchema } from 'typeorm';
import { getNameFromClass } from './helper';
import { Role } from './Models/Entities/Role';
import { User } from './Models/Entities/User';
import { RoleMapping } from './Models/Mappings/RoleMapping';
import { UserMapping } from './Models/Mappings/UserMapping';
import { TYPES } from './types';

const dependencyResolver: Container = new Container();
dependencyResolver.parent = baseResolver;

baseResolver.bind<EntitySchema<User>>(TYPES.IEntityMapping).toConstantValue(UserMapping).whenTargetNamed(getNameFromClass(User));
baseResolver.bind<EntitySchema<Role>>(TYPES.IEntityMapping).toConstantValue(RoleMapping).whenTargetNamed(getNameFromClass(Role));

dependencyResolver.bind<IDataAccessProvider>(TYPES.IDataAccessProvider).to(DataAccessProvider);

export { dependencyResolver };
