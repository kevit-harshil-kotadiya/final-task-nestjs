import { Module } from '@nestjs/common';
import { AdministrationController } from './administration.controller';
import { AdministrationService } from './administration.service';
import {MongooseModule} from "@nestjs/mongoose";
import {administrationSchema} from "./administration.model";

@Module({
  imports:[MongooseModule.forFeature([{name:'Administration',schema:administrationSchema}])],
  controllers: [AdministrationController],
  providers: [AdministrationService]
})

export class AdministrationModule {

}
