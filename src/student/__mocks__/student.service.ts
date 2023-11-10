import { studentStub } from '../test/stubs/student.stub';

export const StudentService = jest.fn().mockReturnValue({
  login: jest.fn().mockReturnValue(studentStub()),
  logout: jest.fn().mockReturnValue('logout successful'),
  takeAttendence: jest.fn().mockReturnValue('Attendance Recorded!'),
});
