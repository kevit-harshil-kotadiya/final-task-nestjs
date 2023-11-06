import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { administrationSchema } from '../administration/administration.model';
import { studentSchema } from './student.model';
import { departmentSchema } from '../department/department.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your actual secret key
      signOptions: {
        expiresIn: '24h', // Set expiration time for the token as needed
      },
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
