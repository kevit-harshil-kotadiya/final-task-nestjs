import { AdministrationService } from '../administration.service';
import { IsNumber, IsString } from 'class-validator';
import {
  administrationStub,
  departmentDataStub,
} from './stubs/administration.stub';

// Mocked Student model for the purpose of testing.This will spy on method of administration.services
jest.mock('../administration.service');

const mockStudentModel = {
  findOne: jest.fn(),
  save: jest.fn(),
  aggregate: jest.fn(),
  find: jest.fn(),
};

const mockAdministrationModel = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockDepartmentModel = {
  findOne: jest.fn(),
  aggregate: jest.fn(),
  save: jest.fn(),
  updateOne: jest.fn(),
};

// Mocked JwtService
const mockJwtService = {
  sign: jest.fn(),
};

// Mock the actual implementation of the StudentService
jest.mock('@nestjs/mongoose', () => ({
  InjectModel: () => jest.fn(() => mockStudentModel),
}));

jest.mock('@nestjs/mongoose', () => ({
  InjectModel: () => jest.fn(() => mockAdministrationModel),
}));

jest.mock('@nestjs/mongoose', () => ({
  InjectModel: () => jest.fn(() => mockDepartmentModel),
}));

jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn(() => mockJwtService),
}));

describe('AdminService', () => {
  let administrationService: AdministrationService;

  beforeEach(() => {
    administrationService = new AdministrationService(
      mockAdministrationModel as any,
      mockStudentModel as any,
      mockDepartmentModel as any,
      mockJwtService as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log in a student', async () => {
    const sampleAdmin = {
      _id: '123',
      studentId: 'sampleAdminId',
      password: 'samplePassword',
      tokens: [],
    };

    // Mock the findOne method of the Student model
    mockAdministrationModel.findOne.mockResolvedValue(sampleAdmin);

    // Mock the sign method of JwtService
    mockJwtService.sign.mockReturnValue('sampleToken');

    const result = await administrationService.login(
      'sampleAdminId',
      'samplePassword',
    );

    expect(result).toBeDefined();
    expect(result.token).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMyNzU1YWQ5ZTlmODU1NWEwNmUzZDMiLCJhZG1pbmlzdHJhdG9ySWQiOiIxYSIsImlhdCI6MTY5OTQzODczNiwiZXhwIjoxNjk5NTI1MTM2fQ.aImpkU9ktQGmsktERCUdtDGnACTezEDO66M0-151Spc',
    );
  });

  it('should create an admin successfully', async () => {
    // Mock the findOne method to return null, indicating that admin doesn't exist
    mockAdministrationModel.findOne.mockResolvedValue(null);

    const adminDto = {
      administratorId: '1a',

      administratorName: 'Harshil',

      profile: 'admin',

      password: 'admin@log01',
    };

    // Mock the save method to return the created admin
    const createdAdmin = { ...adminDto, _id: 'someAdminId' };
    mockAdministrationModel.save.mockResolvedValue(
      administrationStub().administrator,
    );

    const result = await administrationService.createAdmin(adminDto);

    expect(result).toEqual(administrationStub());
  });

  it('should add staff successfully', async () => {
    // Mock the findOne method to return null, indicating that staff doesn't exist
    mockAdministrationModel.findOne.mockResolvedValue(null);

    const staffDto = {
      administratorId: '1s',

      administratorName: 'Harshil',

      profile: 'staff',

      password: 'staff@log01',
    };

    // Mock the save method to return a success message
    mockAdministrationModel.save.mockResolvedValue('staff added Successfully');

    const result = await administrationService.addStaff(staffDto);

    expect(result).toBe('staff added Successfully'); // Check if the success message is returned
  });

  it('should add a student successfully', async () => {
    // Mock the findOne method to return null, indicating that the student doesn't exist
    mockStudentModel.findOne.mockResolvedValue(null);

    const studentDto = {
      name: 'string',

      studentId: 'randomId',

      phoneNumber: 12345678,

      password: 'randomPassword',

      currentSem: 7,

      department: 'IT',

      batch: 2023,
    };

    // Mock the save method to return a success message
    mockStudentModel.save.mockResolvedValue('Student added Successfully');

    const result = await administrationService.addStudent(studentDto);

    // Expectations
    expect(result).toBe('Student added Successfully'); // Check if the success message is returned
  });

  it('should logout the user successfully', async () => {
    const administratorId = 'sampleAdminId';
    const token = 'sampleToken';

    const existingUser = {
      administratorId,
      tokens: [{ token: 'existingToken' }, { token: token }],
      save: jest.fn().mockResolvedValue(true),
    };

    // Mock the findOne method to return the existing user
    mockAdministrationModel.findOne.mockResolvedValue(
      administrationStub().administrator,
    );
    mockAdministrationModel.save.mockResolvedValue(null);
    const result = await administrationService.logout(administratorId, token);

    // Expectations
    expect(result).toEqual(administrationStub().administrator); // Check if the returned user matches the existing user
  });

  it('should return aggregated student data', async () => {
    const expectedAggregatedData = [
      {
        totalStudents: 6,
        year: 2021,
        branches: {
          EC: 1,
          CE: 1,
          ME: 4,
        },
      },
      {
        totalStudents: 3,
        year: 2020,
        branches: {
          ME: 1,
          CE: 1,
          EC: 1,
        },
      },
      {
        totalStudents: 4,
        year: 2019,
        branches: {
          EC: 1,
          CE: 1,
          IT: 1,
          ME: 1,
        },
      },
    ];

    // Mock the aggregate method to return the expected aggregated data
    mockStudentModel.aggregate.mockResolvedValue(expectedAggregatedData);

    const result = await administrationService.getStudentData();

    // Expectations
    expect(result).toEqual(expectedAggregatedData);
  });

  it('should return data for absent students', async () => {
    const date = '2023-11-01';

    const students = [
      {
        name: 'Student1',
        studentId: '1',
        attendance: ['2023-11-02', '2023-11-03'],
      },
      {
        name: 'Student2',
        studentId: '2',
        attendance: ['2023-11-01', '2023-11-03'],
      },
    ];

    // Mock the find method to return the list of students
    mockStudentModel.find.mockResolvedValue(students);

    const result = await administrationService.absentStudents(date);

    // Expectations
    expect(result).toEqual([{ name: 'Student1', Id: '1' }]);
    // expect(mockStudentModel.find).toHaveBeenCalledWith({}); // Ensure that the find method was called
  });

  it('should return data for students with less attendance in a specific semester', async () => {
    const calculateAttendance = jest.fn();
    const semester = 3;
    const students = [
      {
        name: 'Student1',
        studentId: '1',
        currentSem: 3,
        semAttendance: [
          { sem: 1, attendance: '80' },
          { sem: 2, attendance: '60' },
          { sem: 3, attendance: '70' },
        ],
      },
      {
        name: 'Student2',
        studentId: '2',
        currentSem: 3,
        semAttendance: [
          { sem: 1, attendance: '70' },
          { sem: 2, attendance: '75' },
          { sem: 3, attendance: '60' },
        ],
      },
      // Add more students with various semesters and attendance to simulate different scenarios
    ];
    // Mock the find method to return the list of students
    mockStudentModel.find.mockResolvedValue(students);
    // Mock the calculateAttendance method
    calculateAttendance.mockImplementation((student) => {
      const semAttendances = student.semAttendance.find(
        (s) => s.sem === semester,
      );
      return semAttendances ? semAttendances.attendance : 0;
    });
    const result = await administrationService.lessAttendance(semester);
    // Expectations
    expect(result).toEqual([
      { name: 'Student1', studentId: '1', attendance: '70' },
    ]);
  });

  it('should return departments data for a specific year', async () => {
    const year = 2020;

    const expectedDepartmentsData = departmentDataStub();

    // Mock the aggregate method to return the expected aggregated data
    mockDepartmentModel.aggregate.mockResolvedValue(expectedDepartmentsData);

    const result = await administrationService.getDepartments(year);

    // Expectations
    expect(result).toEqual(expectedDepartmentsData); // Check if the returned data matches the expected aggregated data
  });

  it('should update an existing department for a specific year', async () => {
    const year = '2020';
    const dataToAdd = {
      /* object representing the data to be added or updated */
    };

    // Mock the findOne method to return an existing department
    mockDepartmentModel.findOne.mockResolvedValue({});

    const result = await administrationService.addDepartmentData(
      year,
      dataToAdd,
    );

    // Expectations
    expect(result).toBe('Department has been updated'); // Check if the correct message is returned for an update
  });

  it('should update the student with currentSem change and calculate attendance', async () => {
    const body = {
      studentId: '123',
      currentSem: 4 /* other update data if needed */,
    };

    // Mock an existing student with a different currentSem
    const existingStudent = {
      studentId: '123',
      currentSem: 3,
      semAttendance: [],
      attendance: [],
    };
    mockStudentModel.findOne.mockResolvedValue(existingStudent);

    // Mock the calculateAttendance method to simulate attendance calculation

    const result = await administrationService.updateStudent(body);

    // Expectations
    expect(result).toBe('student updated successfully');
  });
});
