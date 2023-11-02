import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {AdministrationLoginDto} from "./dtos/administration-login.dto";

@Controller('administration')
export class AdministrationController {

    @Post('/login')
    async login(@Body() body:AdministrationLoginDto){
        return body;
    }

    @Post('/add-admin')
    addAdmin():void{

    }

    @Post('/student')
    addStudent():void{

    }

    @Post('/add-staff')
    addStaff(){

    }

    @Post('/logout')
    logout(){

    }

    @Get('/list-students')
    listStudents(){

    }


    @Get('/absent-students')
    absentStudents(){

    }

    @Get('/less-attendance')
    lessAttendance(){

    }

    @Get('/departments')
    departments(){

    }

    @Put('/departments')
    addDepartmentData(){

    }

    @Put('/student')
    updateStudent(){

    }

}
