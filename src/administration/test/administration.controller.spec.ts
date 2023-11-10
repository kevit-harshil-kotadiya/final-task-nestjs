import { Test } from '@nestjs/testing';
import { AdministrationController } from '../administration.controller';
import { AdministrationService } from '../administration.service';
import {
  administrationStub,
  departmentDataStub,
  studentDataStud,
} from './stubs/administration.stub';
import { HttpStatus } from '@nestjs/common';
import { IsString } from 'class-validator';

jest.mock('../administration.service.ts');

describe('StudentController', () => {
  let administrationController: AdministrationController;
  let administrationService: AdministrationService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AdministrationController],
      providers: [AdministrationService],
    }).compile();

    administrationController = moduleRef.get<AdministrationController>(
      AdministrationController,
    );
    administrationService = moduleRef.get<AdministrationService>(
      AdministrationService,
    );
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return login response on successful login', async () => {
      // Arrange
      const mockBody = { administratorId: 'admin123', password: 'password123' };
      const mockLoginResponse = { token: 'mockToken' };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      const res = await administrationController.login(mockBody, mockRes);

      // Assert
      expect(administrationService.login).toHaveBeenCalledWith(
        'admin123',
        'password123',
      );
      expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockRes.send).toHaveBeenCalledWith(administrationStub());
    });
  });

  describe('addAdmin', () => {
    it('should call createAdmin method with correct parameters', async () => {
      // Arrange
      const mockAdminDto = {
        administratorId: '1a',

        administratorName: 'string',

        profile: 'admin',

        password: 'admin@log01',
      };

      // Act
      const res = await administrationController.addAdmin(mockAdminDto);

      // Assert
      expect(administrationService.createAdmin).toHaveBeenCalledWith(
        mockAdminDto,
      );
      expect(res).toEqual(administrationStub());
    });
  });

  describe('addStudent', () => {
    it('should call addStudent method with correct parameters', async () => {
      // Arrange
      const mockStudentDto = {
        name: 'string',

        studentId: 'randomId',

        phoneNumber: 12345678,

        password: 'randomPassword',

        currentSem: 7,

        department: 'IT',

        batch: 2023,
      };

      // Act
      const res = await administrationController.addStudent(mockStudentDto);

      // Assert
      expect(administrationService.addStudent).toHaveBeenCalledWith(
        mockStudentDto,
      );
      expect(res).toEqual('Student added Successfully');
    });
  });

  describe('addStaff', () => {
    it('should call addStaff method with correct parameters', async () => {
      // Arrange
      const mockAdministrationDto = {
        administratorId: '1a',

        administratorName: 'string',

        profile: 'admin',

        password: 'admin@log01',
      };
      // Act
      const res = await administrationController.addStaff(
        mockAdministrationDto,
      );

      // Assert
      expect(administrationService.addStaff).toHaveBeenCalledWith(
        mockAdministrationDto,
      );
      expect(res).toEqual('staff added Successfully');
    });
  });

  describe('logout', () => {
    it('should return logout response on successful logout', async () => {
      // Arrange
      const mockLoginResponse = { token: 'mockToken' };
      const mockReq = {
        user: { administratorId: 'admin123' },
        headers: { authorization: 'Bearer mockToken' },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      const res = await administrationController.logout(mockReq, mockRes);

      // Assert
      expect(administrationService.logout).toHaveBeenCalledWith(
        'admin123',
        'mockToken',
      );
      expect(mockRes.send).toHaveBeenCalledWith('logout successful');
    });
  });

  describe('listStudents', () => {
    it('should return student data when data is present', async () => {
      // Arrange
      const mockStudentData = {
        name: 'string',

        studentId: 'randomId',

        phoneNumber: 12345678,

        password: 'randomPassword',

        currentSem: 7,

        department: 'IT',

        batch: 2023,
      };

      // Act
      const result = await administrationController.listStudents();

      // Assert
      expect(result).toStrictEqual(studentDataStud());
    });
  });

  describe('absent-students', () => {
    it('should return absent student data when data is present', async () => {
      // Arrange
      const mockBody = {
        date: '10-10-2023',
      };

      // Act
      const result = await administrationController.absentStudents(mockBody);

      // Assert
      expect(result).toStrictEqual([{ name: 'Student1', Id: '1' }]);
    });
  });

  describe('less-attendance', () => {
    it('should return  student data with less attendance when data is present', async () => {
      // Arrange
      const mockBody = {
        sem: 7,
      };

      // Act
      const result = await administrationController.lessAttendance(mockBody);

      // Assert
      expect(result).toStrictEqual([
        { name: 'Student1', studentId: '1', attendance: '70' },
      ]);
    });
  });

  describe('get departments', () => {
    it('should department data when data is present', async () => {
      // Arrange
      const mockBody = {
        year: 2020,
      };

      // Act
      const result = await administrationController.departments(mockBody);

      // Assert
      expect(result).toStrictEqual(departmentDataStub());
    });
  });

  describe('update departments', () => {
    it('should update department data when data is present', async () => {
      // Arrange
      const mockBody = {
        year: '2023',
        branches: [
          {
            name: 'Computer Science',
            totalStudentsIntake: 100,
          },
          {
            name: 'Electrical Engineering',
            totalStudentsIntake: 80,
          },
        ],
      };

      // Act
      const result = await administrationController.addDepartmentData(mockBody);

      // Assert
      expect(result).toStrictEqual('Department has been updated');
    });
  });

  describe('update students', () => {
    it('should update students data when data is present', async () => {
      // Arrange
      const mockBody = {
      };
      // Act
      const result = await administrationController.updateStudent(mockBody);

      // Assert
      expect(result).toStrictEqual('student updated successfully');
    });
  });


});
