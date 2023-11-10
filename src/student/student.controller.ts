import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentloginDto } from './dtos/studentlogin.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Post('/login')
  async login(@Body() body: StudentloginDto) {
    const { studentId, password } = body;
    const loginResponse = await this.studentService.login(studentId, password);
    return loginResponse;
  }

  @Post('/logout')
  async logout(@Req() req, @Res() res) {
    try {
      const student = req.user;
      const studentId = student.studentId;
      const token = req.headers.authorization.replace('Bearer ', '') || null;
      if (!token) {
        res.status(401).send('Pls login!!');
      }
      const user = await this.studentService.logout(studentId, token);
      if (!user) {
        res.status(404).send('User not found');
      }
      return res.send('logout successful');
    } catch (e) {
      return res.status(500).send('Server error');
    }
  }

  @Post('/attendence')
  async recordAttendance(@Req() req) {
    const { studentId } = req.user;
    return this.studentService.takeAttendence(studentId);
  }
}
