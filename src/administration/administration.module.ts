import { Module } from '@nestjs/common';
import { AdministrationController } from './administration.controller';
import { AdministrationService } from './administration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { administrationSchema } from './administration.model';
import { studentSchema } from '../student/student.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Administration', schema: administrationSchema },
      { name: 'Student', schema: studentSchema },
    ]),
  ],
  controllers: [AdministrationController],
  providers: [AdministrationService],
})
export class AdministrationModule {}
