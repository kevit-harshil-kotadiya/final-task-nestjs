import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdministrationDto } from './dtos/administration.dto';
import { StudentDto } from '../student/dtos/student.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdministrationService {
  constructor(
    @InjectModel('Administration') private readonly Administration: Model<any>,
    @InjectModel('Student') private readonly Student: Model<any>,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(Admin: AdministrationDto) {
    if (await this.Administration.findOne({ profile: 'admin' })) {
      throw new HttpException('Admin already exists', HttpStatus.CONFLICT);
    }
    const admin = new this.Administration(Admin);
    await admin.save();
    return admin;
  }

  async addStaff(Staff: AdministrationDto) {
    if (
      await this.Administration.findOne({
        administratorId: Staff.administratorId,
      })
    ) {
      throw new HttpException('Staff already exists', HttpStatus.CONFLICT);
    }
    const staff = new this.Administration(Staff);
    await staff.save();
    return 'staff added Successfully';
  }

  async addStudent(studentData: StudentDto) {
    if (
      await this.Student.findOne({
        studentId: studentData.studentId,
      })
    ) {
      throw new HttpException('Student already exists', HttpStatus.CONFLICT);
    }
    const student = new this.Student(studentData);
    await student.save();
    return 'Student added Successfully';
  }

  async login(administratorId: string, password: string) {
    const administrator:any = await this.Administration.findOne({administratorId});
    if(administrator){
      const match = password === administrator.password;

      if (match){
        const token = this.jwtService.sign({
          _id: administrator._id.toString(),
          administratorId: administrator.administratorId,
        });

        administrator.tokens.push({ token });
        await administrator.save();

        return { administrator, token };
      }

      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

}
