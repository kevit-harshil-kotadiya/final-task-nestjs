import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministrationModule } from './administration/administration.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { DepartmentModule } from './department/department.module';
import * as dotenv from 'dotenv';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import * as process from 'process';
import { administrationSchema } from './administration/administration.model';
import { studentSchema } from './student/student.model';
import { departmentSchema } from './department/department.model';
import { JwtModule } from '@nestjs/jwt';

dotenv.config();

@Module({
  imports: [
    AdministrationModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    StudentModule,
    DepartmentModule,
    MongooseModule.forFeature([
      { name: 'Administration', schema: administrationSchema },
      { name: 'Student', schema: studentSchema },
      { name: 'Department', schema: departmentSchema },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your actual secret key
      signOptions: {
        expiresIn: '24h', // Set expiration time for the token as needed
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: 'administration/login', method: RequestMethod.ALL },
        { path: 'student/login', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
