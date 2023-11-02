import { Module } from '@nestjs/common';
import { AdministrationController } from './administration.controller';
import { AdministrationService } from './administration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { administrationSchema } from './administration.model';
import { studentSchema } from '../student/student.model';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Administration', schema: administrationSchema },
      { name: 'Student', schema: studentSchema },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your actual secret key
      signOptions: {
        expiresIn: '24h', // Set expiration time for the token as needed
      },
    })
  ],
  controllers: [AdministrationController],
  providers: [AdministrationService],

})
export class AdministrationModule {}
