import { Module } from '@nestjs/common';
import { AuthNController } from './AuthNController';

@Module({
  imports: [],
  controllers: [
    AuthNController,
  ],
  providers: [],
})
export class AuthNModule {
}
