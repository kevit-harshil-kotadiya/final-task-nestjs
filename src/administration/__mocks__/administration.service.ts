import {
  administrationStub,
  departmentDataStub,
  studentDataStud,
} from '../test/stubs/administration.stub';

export const AdministrationService = jest.fn().mockReturnValue({
  login: jest.fn().mockReturnValue(administrationStub()),
  createAdmin: jest.fn().mockReturnValue(administrationStub()),
  addStaff: jest.fn().mockReturnValue('staff added Successfully'),
  addStudent: jest.fn().mockReturnValue('Student added Successfully'),
  logout: jest.fn().mockReturnValue(administrationStub().administrator),
  getStudentData: jest.fn().mockReturnValue(studentDataStud()),
  absentStudents: jest.fn().mockReturnValue([{ name: 'Student1', Id: '1' }]),
  lessAttendance: jest
    .fn()
    .mockReturnValue([{ name: 'Student1', studentId: '1', attendance: '70' }]),
  getDepartments: jest.fn().mockReturnValue(departmentDataStub()),
  addDepartmentData: jest.fn().mockReturnValue('Department has been updated'),
  updateStudent: jest.fn().mockReturnValue('student updated successfully'),
  calculateAttendance: jest.fn().mockReturnValue(45),
});
