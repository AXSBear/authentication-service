import { Module } from '@nestjs/common';
import { HealthCheckController } from './HealthCheckController';

@Module({
  imports: [],
  controllers: [
    HealthCheckController,
  ],
  providers: [],
})
export class HealthCheckModule {
}
