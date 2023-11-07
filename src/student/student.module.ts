import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';

import { studentSchema } from './student.model';

import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
    JwtModule.register({
      secret: process.env.KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
