import { StudentService } from '../student.service';

// Mocked Student model for the purpose of testing
jest.mock('../student.service');

const mockStudentModel = {
  findOne: jest.fn(),
};

// Mocked JwtService
const mockJwtService = {
  sign: jest.fn(),
};

// Mock the actual implementation of the StudentService
jest.mock('@nestjs/mongoose', () => ({
  InjectModel: () => jest.fn(() => mockStudentModel),
}));

jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn(() => mockJwtService),
}));

describe('StudentService', () => {
  let studentService: StudentService;

  beforeEach(() => {
    studentService = new StudentService(
      mockStudentModel as any,
      mockJwtService as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log in a student', async () => {
    const sampleStudent = {
      _id: '123',
      studentId: 'sampleStudentId',
      password: 'samplePassword',
      tokens: [],
    };

    // Mock the findOne method of the Student model
    mockStudentModel.findOne.mockResolvedValue(sampleStudent);

    // Mock the sign method of JwtService
    mockJwtService.sign.mockReturnValue('sampleToken');

    const result = await studentService.login(
      'sampleStudentId',
      'samplePassword',
    );

    expect(result).toBeDefined();
    expect(result.token).toBe(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMzNzJlZTQ3MzcyYzhjNTg0MjE0YTEiLCJzdHVkZW50SWQiOiIxMCIsImlhdCI6MTY5OTM1MzQyMSwiZXhwIjoxNjk5NDM5ODIxfQ.FKtUwTVNjuyRUCsWrgnTFjwJshWguFKFFykhtyuMn2s',
    );
  });

  it('should logout a student', async () => {
    const sampleStudent = {
      studentId: 'sampleStudentId',
      tokens: [{ token: 'sampleToken' }],
      save: jest.fn().mockResolvedValue(true),
    };

    mockStudentModel.findOne.mockResolvedValue(sampleStudent);

    const result = await studentService.logout(
      'sampleStudentId',
      'sampleToken',
    );

    expect(result).toEqual('logout successful');
  });

  it('should take attendance for a student', async () => {
    const sampleStudent = {
      studentId: 'sampleStudentId',
      attendance: [],
      save: jest.fn().mockResolvedValue(true),
    };

    mockStudentModel.findOne.mockResolvedValue(sampleStudent);

    const result = await studentService.takeAttendence('sampleStudentId');

    expect(result).toBe('Attendance Recorded!');
  });
});
