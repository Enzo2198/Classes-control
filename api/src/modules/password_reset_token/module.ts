import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/module';
import { DataSource } from 'typeorm';
import {DATA_SOURCE, PasswordResetTokenRepository} from "@/share";
import {PasswordResetTokenEntity} from "@/modules/password_reset_token/entities";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: PasswordResetTokenRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(PasswordResetTokenEntity),
      inject: [DATA_SOURCE],
    },
  ],
  exports: [PasswordResetTokenRepository],
})
export class PasswordResetTokenModule {}
