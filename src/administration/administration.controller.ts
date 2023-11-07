import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdministrationLoginDto } from './dtos/administration-login.dto';
import { AdministrationService } from './administration.service';
import { AdministrationDto } from './dtos/administration.dto';
import { StudentDto } from '../student/dtos/student.dto';
import {
  AdminAuthorizationGuard,
  StaffAuthorizationGuard,
} from './guards/admin.guard';
import { throttle } from 'rxjs';
import { Aggregate } from 'mongoose';
import { DepartmentDto } from '../department/dtos/departmentData.dto';
import {listStudentType} from "./customTypes/list-student.type";

@Controller('administration')
export class AdministrationController {
  constructor(private adminService: AdministrationService) {}

  @Post('/login')
  async login(@Body() body: AdministrationLoginDto, @Res() res) {
    try {
      const { administratorId, password } = body;
      const loginResponse = await this.adminService.login(
        administratorId,
        password,
      );
      return res.status(HttpStatus.OK).send(loginResponse);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).send(error.message);
    }
  }

  @Post('/add-admin')
  @UseGuards(AdminAuthorizationGuard)
  async addAdmin(@Body() body: AdministrationDto) {
    return  this.adminService.createAdmin(body);
  }

  @Post('/student')
  @UseGuards(StaffAuthorizationGuard)
  async addStudent(@Body() body: StudentDto) {
    return  this.adminService.addStudent(body);
  }

  @Post('/add-staff')
  @UseGuards(AdminAuthorizationGuard)
  async addStaff(@Body() body: AdministrationDto) {
    return  this.adminService.addStaff(body);
  }

  @Post('/logout')
  async logout(@Req() req, @Res() res) {
    try {
      const {administratorId} = req.user;
      const token = req.headers.authorization.replace('Bearer ', '');

      const user = await this.adminService.logout(administratorId, token);

      if (user) {
        res.send('logout successful');
      } else {
        res.status(404).send('User not found');
      }
    } catch (e) {
      return res.status(500).send('Server error');
    }
  }

  @Get('/list-students')
  @UseGuards(StaffAuthorizationGuard)
  async listStudents():Promise<listStudentType> {
    const studentData: any = await this.adminService.getStudentData();

    if (!studentData || studentData.length === 0) {
      throw new HttpException('No Data Found!!', HttpStatus.NO_CONTENT);
    }
    return studentData;
  }

  @Get('/absent-students')
  @UseGuards(StaffAuthorizationGuard)
  absentStudents(@Body() body) {
    const { date } = body;
    if (!date) return 'Please enter a date';
    return this.adminService.absentStudents(date);
  }

  @Get('/less-attendance')
  @UseGuards(StaffAuthorizationGuard)
  lessAttendance(@Body() body) {
    const sem = parseInt(body.sem);
    if (!sem) return 'Please enter a sem';
    return this.adminService.lessAttendance(sem);
  }

  @Get('/departments')
  @UseGuards(AdminAuthorizationGuard)
  departments(@Body() body) {
    const { year } = body;
    return this.adminService.getDepartments(year);
  }

  @Put('/departments')
  @UseGuards(AdminAuthorizationGuard)
  async addDepartmentData(@Body() body: DepartmentDto) {
    const { year, ...dataToAdd } = body;
    return  this.adminService.addDepartmentData(year, dataToAdd);
  }

  @Put('/student')
  @UseGuards(StaffAuthorizationGuard)
  async updateStudent(@Body() body) {
    return  this.adminService.updateStudent(body);
  }
}
