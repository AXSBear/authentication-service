import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger auto generate module
 */
export class Swagger {
  /**
   * Setup new swagger doc
   * @param app
   */
  public static setup(app) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('Sports Travel Manager')
      .setDescription('АИС Командировки')
      .setVersion('1.0')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('swagger', app, swaggerDocument);
  }
}
