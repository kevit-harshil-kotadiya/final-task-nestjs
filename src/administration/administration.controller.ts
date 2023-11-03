import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AdministrationLoginDto } from './dtos/administration-login.dto';
import { AdministrationService } from './administration.service';
import { AdministrationDto } from './dtos/administration.dto';
import { StudentDto } from '../student/dtos/student.dto';

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
  async addAdmin(@Body() body: AdministrationDto) {
    return await this.adminService.createAdmin(body);
  }

  @Post('/student')
  async addStudent(@Body() body: StudentDto) {
    return await this.adminService.addStudent(body);
  }

  @Post('/add-staff')
  async addStaff(@Body() body: AdministrationDto) {
    return await this.adminService.addStaff(body);
  }

  @Post('/logout')
  logout() {}

  @Get('/list-students')
  listStudents() {}

  @Get('/absent-students')
  absentStudents() {}

  @Get('/less-attendance')
  lessAttendance() {}

  @Get('/departments')
  departments() {}

  @Put('/departments')
  addDepartmentData() {}

  @Put('/student')
  updateStudent() {}
}
