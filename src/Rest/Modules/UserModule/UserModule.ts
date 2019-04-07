import { Module } from '@nestjs/common';
import { UserController } from './UserController';

@Module({
  imports: [],
  controllers: [
    UserController,
  ],
  providers: [],
})
export class UserModule {
}
