import { Test } from '@nestjs/testing';
import { StudentController } from '../student.controller';
import { StudentService } from '../student.service';
import { studentStub } from './stubs/student.stub';

jest.mock('../student.service');

describe('StudentController', () => {
  let studentController: StudentController;
  let studentService: StudentService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    studentController = moduleRef.get<StudentController>(StudentController);
    studentService = moduleRef.get<StudentService>(StudentService);
    jest.clearAllMocks();
  });

  describe('attendance', () => {
    describe('when attendance is called', () => {
      let returnValue;
      let req = {
        user: {
          studentId: '69',
        },
      };

      beforeEach(async () => {
        returnValue = await studentController.recordAttendance(req);
      });

      test('then it should call studentService', () => {
        expect(studentService.takeAttendence).toBeCalledWith(
          req.user.studentId,
        );
      });

      test('then it should return attendance recorded!', () => {
        expect(returnValue).toEqual('Attendance Recorded!');
      });
    });
  });

  describe('login', () => {
    describe('when login is called', () => {
      let returnValue;
      let body = {
        studentId: '10',
        password: 'student@log01',
      };

      let res = studentStub();

      beforeEach(async () => {
        returnValue = await studentController.login(body);
      });

      test('then it should call studentService', () => {
        expect(studentService.login).toBeCalledWith(
          body.studentId,
          body.password,
        );
      });

      test('then it should return attendence recorded!', () => {
        expect(returnValue).toEqual(res);
      });
    });
  });

  describe('logout', () => {
    it('logout method should return "logout successful"', async () => {
      const mockReq = {
        user: { studentId: 'sampleStudentId' },
        headers: { authorization: 'Bearer sampleToken' },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const sampleUser = studentStub().student;
      const logoutSpy = jest
        .spyOn(studentService, 'logout')
        .mockResolvedValue(sampleUser);

      await studentController.logout(mockReq, mockRes);

      expect(logoutSpy).toHaveBeenCalledWith('sampleStudentId', 'sampleToken');
      expect(mockRes.send).toHaveBeenCalledWith('logout successful');
    });
  });
});
