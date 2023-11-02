import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AdministrationLoginDto } from './dtos/administration-login.dto';
import { AdministrationService } from './administration.service';
import { AdministrationDto } from './dtos/administration.dto';

@Controller('administration')
export class AdministrationController {
  constructor(private adminService: AdministrationService) {}

  @Post('/login')
  async login(@Body() body: AdministrationLoginDto) {}

  @Post('/add-admin')
  async addAdmin(@Body() body: AdministrationDto) {
    return await this.adminService.createAdmin(body);
  }

  @Post('/student')
  addStudent(): void {}

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
