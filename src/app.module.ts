import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministrationModule } from './administration/administration.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

@Module({
  imports: [
    AdministrationModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
