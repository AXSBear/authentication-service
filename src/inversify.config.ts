import { baseResolver, Container, DataAccessProvider, IDataAccessProvider, IEntity, IService } from '@inspe/core';
import { EntitySchema } from 'typeorm';
import { getNameFromClass } from './helper';
import { Role } from './Models/Entities/Role';
import { User } from './Models/Entities/User';
import { RoleMapping } from './Models/Mappings/RoleMapping';
import { UserMapping } from './Models/Mappings/UserMapping';
import { IAuthService } from './Services/Services.Face/IAuthService';
import { IBaseCrudService } from './Services/Services.Face/IBaseCrudService';
import { BaseCrudService } from './Services/Services/BaseCrudService';
import { JwtAuthService } from './Services/Services/JwtAuthService';
import { TYPES } from './types';

const dependencyResolver: Container = new Container();
dependencyResolver.parent = baseResolver;

baseResolver.bind<EntitySchema<User>>(TYPES.IEntityMapping).toConstantValue(UserMapping).whenTargetNamed(getNameFromClass(User));
baseResolver.bind<EntitySchema<Role>>(TYPES.IEntityMapping).toConstantValue(RoleMapping).whenTargetNamed(getNameFromClass(Role));

dependencyResolver.bind<IDataAccessProvider>(TYPES.IDataAccessProvider).to(DataAccessProvider);
/*
 * Invesify bindings for services
 */
baseResolver.bind<IBaseCrudService<IEntity>>(TYPES.IService).to(BaseCrudService).whenTargetIsDefault();
baseResolver.bind<IAuthService>(TYPES.IAuthService).to(JwtAuthService).whenTargetIsDefault();

export { dependencyResolver };
