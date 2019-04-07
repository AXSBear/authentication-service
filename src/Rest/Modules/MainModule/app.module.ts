import { Module } from '@nestjs/common';
import { AuthNModule } from '../AuthNModule/AuthNModule';
import { HealthCheckModule } from '../HealthCheckModule/HealthCheckModule';
import { UserModule } from '../UserModule/UserModule';

@Module({
  imports: [
    AuthNModule,
    HealthCheckModule,
    UserModule,
  ],
})
export class AppModule {
}
