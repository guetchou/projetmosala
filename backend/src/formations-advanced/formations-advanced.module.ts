import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsAdvancedService } from './formations-advanced.service';
import { FormationsAdvancedController } from './formations-advanced.controller';
import { FormationAdvanced } from './entities/formation-advanced.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormationAdvanced])],
  controllers: [FormationsAdvancedController],
  providers: [FormationsAdvancedService],
})
export class FormationsAdvancedModule {}
