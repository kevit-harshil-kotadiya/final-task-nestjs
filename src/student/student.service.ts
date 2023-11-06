import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import * as dayjs from 'dayjs';
@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private readonly Student: Model<any>,
    private readonly jwtService: JwtService,
  ) {}

  async login(studentId: string, password: string) {
    const student: any = await this.Student.findOne({
      studentId,
    });
    if (student) {
      const match = password === student.password;

      if (match) {
        const token = this.jwtService.sign(
          {
            _id: student._id.toString(),
            studentId: student.studentId,
          },
          { secret: process.env.KEY },
        );

        student.tokens.push({ token });
        await student.save();

        return { student, token };
      }

      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
  }

  async logout(studentId: string, token: string) {
    try {
      const user: any = await this.Student.findOne({ studentId });
      if (!user) {
        return null;
      }

      user.tokens = user.tokens.filter((t) => t.token !== token);
      await user.save();

      return user;
    } catch (e) {
      // Log or handle the error accordingly
      return null;
    }
  }
  async takeAttendence(studentId) {
    const student: any = await this.Student.findOne({ studentId });

    if (!student) {
      throw new NotFoundException('student not found! or please login again!');
    }

    const currentDate = dayjs().format('YYYY-MM-DD'); // Format: "YYYY-MM-DD"

      if (student.attendance.includes(currentDate)) {
          throw new ConflictException('Attendance already recorded!!');
      } else {
          student.attendance.push(currentDate);
          await student.save();
          return 'Attendance Recorded!';
      }
  }
}
