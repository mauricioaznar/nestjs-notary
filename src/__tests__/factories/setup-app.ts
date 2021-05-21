import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { appConfig } from '../../app-config';

export async function setupApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  appConfig(app, AppModule);
  await app.init();
  return app;
}
