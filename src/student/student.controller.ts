import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentloginDto } from './dtos/studentlogin.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Post('/login')
  async login(@Body() body: StudentloginDto, @Res() res) {
    try {
      const { studentId, password } = body;
      const loginResponse = await this.studentService.login(
        studentId,
        password,
      );
      return res.status(HttpStatus.OK).send(loginResponse);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).send(error.message);
    }
  }

  @Post('/logout')
  async logout(@Req() req, @Res() res) {
    try {
      const student = req.user;
      const studentId = student.studentId;
      const token = req.headers.authorization.replace('Bearer ', '');

      const user = await this.studentService.logout(studentId, token);

      if (user) {
        res.send('logout successful');
      } else {
        res.status(404).send('User not found');
      }
    } catch (e) {
      return res.status(500).send('Server error');
    }
  }

  @Post('/attendence')
  async recordAttendance(@Req() req) {
    const { studentId } = req.user;
    return await this.studentService.takeAttendence(studentId);
  }
}
