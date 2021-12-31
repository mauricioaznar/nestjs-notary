import { CacheModule, Module } from '@nestjs/common';
import { MemoryTokenService } from './memory-token.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/jwt';

@Module({
  imports: [
    MemoryTokenModule,
    CacheModule.register({ ttl: 0, isGlobal: true }),
    JwtModule.register({
      secret: jwtConstants.fileSecret,
      signOptions: { expiresIn: jwtConstants.fileExpiresIn },
    }),
  ],
  providers: [MemoryTokenService],
  exports: [MemoryTokenService],
})
export class MemoryTokenModule {}
