import { Module } from '@nestjs/common';
import { SessionController } from './SessionController';
import { UserController } from './UserController';

@Module({
  imports: [],
  controllers: [
    UserController,
    SessionController,
  ],
  providers: [],
})
export class UserModule {
}
