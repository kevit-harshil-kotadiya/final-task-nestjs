import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AdministrationDto} from "./dtos/administration.dto";

@Injectable()
export class AdministrationService {
    constructor(@InjectModel('Administration') private readonly Administration:Model<any>) {

    }

    private adminDetails = {
        "administratorName":"Harshil",
        "profile":"admin",
        "administratorId":"1a",
        "password":"admin@log01"
    }

    async createAdmin(Admin:AdministrationDto){
            if(await this.Administration.findOne({administratorId:Admin.administratorId})){
                throw new HttpException('Admin already exists', HttpStatus.CONFLICT);
            }
            const admin = new this.Administration(Admin);
            await admin.save();
            return admin;
    }

    async addStaff(Staff:AdministrationDto){
        if(await this.Administration.findOne({administratorId:Staff.administratorId})){
            throw new HttpException('Staff already exists', HttpStatus.CONFLICT);
        }
        const staff = new this.Administration(Staff);
        await staff.save();
        return 'staff added Sucessfully';
    }

}
