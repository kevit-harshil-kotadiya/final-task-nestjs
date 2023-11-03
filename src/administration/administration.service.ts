import {HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AdministrationDto} from './dtos/administration.dto';
import {StudentDto} from '../student/dtos/student.dto';
import {JwtService} from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AdministrationService {
  constructor(
    @InjectModel('Administration') private readonly Administration: Model<any>,
    @InjectModel('Student') private readonly Student: Model<any>,
    @InjectModel('Batch') private readonly Department: Model<any>,
    private readonly jwtService: JwtService,
  ) {}

  private even: number = 95;
  private odd: number = 136;
  async calculateAttendance(student) {
    let attendance: number = 0;

    if (parseInt(student.currentSem) % 2 === 0) {
      attendance = (student.attendance.length / this.even) * 100;
    }
    if (parseInt(student.currentSem) % 2 === 1) {
      attendance = (student.attendance.length / this.odd) * 100;
    }

    return attendance.toFixed(2);
  }



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
    const administrator: any = await this.Administration.findOne({
      administratorId,
    });
    if (administrator) {
      const match = password === administrator.password;

      if (match) {
        const token = this.jwtService.sign(
          {
            _id: administrator._id.toString(),
            administratorId: administrator.administratorId,
          },
          { secret: process.env.KEY },
        );

        administrator.tokens.push({ token });
        await administrator.save();

        return { administrator, token };
      }

      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async logout(administratorId: string, token: string) {
    try {
      const user: any = await this.Administration.findOne({ administratorId });
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

  async getStudentData(){
    return this.Student.aggregate([
      {
        $group: {
          _id: {year: "$batch", department: "$department"},
          totalStudents: {$sum: 1},
        },
      },
      {
        $group: {
          _id: "$_id.year",
          totalStudents: {$sum: "$totalStudents"},
          branches: {
            $push: {k: "$_id.department", v: "$totalStudents"},
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          totalStudents: 1,
          branches: {$arrayToObject: "$branches"},
        },
      },
    ]);
  }

  async absentStudents(date) {
    const data = [];

    if (new Date(date) > new Date()) {
      return "No Data Found!";
    }

    const students = await this.Student.find({});

    for (const student of students) {
      if (!student.attendance.includes(date)) {
        const stData = {
          name: student.name,
          Id: student.studentId,
        };
        data.push(stData);
      }
    }

    if (data.length === 0) {
      return "No Student Absent";
    }

    return data;
  }

  async lessAttendance(sem) {
    const students = await this.Student.find({ currentSem: { $gte: sem } });
    const data = [];

    for (const student of students) {
      if (student.currentSem === sem) {
        const attendance = await this.calculateAttendance(student);

        if (parseInt(attendance) < 75) {
          const studentWithLessAttedance = {
            name: student.name,
            studentId: student.studentId,
            attendance,
          };

          data.push(studentWithLessAttedance);
        }
      }

      if (student.currentSem > sem) {
        const foundSemAttendence = student.semAttendance.find(
            (item) => item.sem === sem,
        );

        if (
            foundSemAttendence !== undefined &&
            parseInt(foundSemAttendence.attendance) < 75
        ) {
          const studentWithLessAttedance = {
            name: student.name,
            studentId: student.studentId,
            attendance: foundSemAttendence.attendance,
          };

          data.push(studentWithLessAttedance);
        }
      }
    }
    if (data.length===0){
      return 'No Data Found!'
    }
    return data;
  }

  async getDepartments(year) {
    try {
      const data:any = await this.Department.aggregate([
        {
          $match: { year }, // Filter by the desired batch year (2020 in this case)
        },
        {
          $unwind: "$branches",
        },
        {
          $group: {
            _id: "$year",
            branches: {
              $push: {
                name: "$branches.name",
                totalStudents: "$branches.totalStudents",
                totalStudentsIntake: "$branches.totalStudentsIntake",
                availableIntake: {
                  $subtract: [
                    "$branches.totalStudentsIntake",
                    "$branches.totalStudents",
                  ],
                },
              },
            },
            totalStudents: { $sum: "$branches.totalStudents" },
            totalStudentsIntake: { $sum: "$branches.totalStudentsIntake" },
          },
        },
        {
          $project: {
            _id: 0,
            batch: "$_id",
            totalStudents: 1,
            totalStudentsIntake: 1,
            availableIntake: {
              $subtract: ["$totalStudentsIntake", "$totalStudents"],
            },
            branches: {
              $arrayToObject: {
                $map: {
                  input: "$branches",
                  as: "b",
                  in: { k: "$$b.name", v: "$$b" },
                },
              },
            },
          },
        },
      ]);
      if (data.length === 0) {
        return 'No Data Found!';
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while processing the request.');
    }
  }

}
