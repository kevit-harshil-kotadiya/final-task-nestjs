export const administrationStub = () => {
  return {
    administrator: {
      _id: '6532755ad9e9f8555a06e3d3',
      administratorName: 'Harshil',
      profile: 'admin',
      administratorId: '1a',
      password: 'admin@log01',
      __v: 56,
      tokens: [
        {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMyNzU1YWQ5ZTlmODU1NWEwNmUzZDMiLCJhZG1pbmlzdHJhdG9ySWQiOiIxYSIsImlhdCI6MTY5OTQzODczNiwiZXhwIjoxNjk5NTI1MTM2fQ.aImpkU9ktQGmsktERCUdtDGnACTezEDO66M0-151Spc',
          _id: '654b6090dda9524f48f7b522',
        },
      ],
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMyNzU1YWQ5ZTlmODU1NWEwNmUzZDMiLCJhZG1pbmlzdHJhdG9ySWQiOiIxYSIsImlhdCI6MTY5OTQzODczNiwiZXhwIjoxNjk5NTI1MTM2fQ.aImpkU9ktQGmsktERCUdtDGnACTezEDO66M0-151Spc',
  };
};
export const staffStub = () => {
  return {
    administrator: {
      _id: '6532755ad9e9f8555a06e3d3',
      administratorName: 'Harshil',
      profile: 'staff',
      administratorId: '1s',
      password: 'staff@log01',
      __v: 56,
      tokens: [
        {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMyNzU1YWQ5ZTlmODU1NWEwNmUzZDMiLCJhZG1pbmlzdHJhdG9ySWQiOiIxYSIsImlhdCI6MTY5OTQzODczNiwiZXhwIjoxNjk5NTI1MTM2fQ.aImpkU9ktQGmsktERCUdtDGnACTezEDO66M0-151Spc',
          _id: '654b6090dda9524f48f7b522',
        },
      ],
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMyNzU1YWQ5ZTlmODU1NWEwNmUzZDMiLCJhZG1pbmlzdHJhdG9ySWQiOiIxYSIsImlhdCI6MTY5OTQzODczNiwiZXhwIjoxNjk5NTI1MTM2fQ.aImpkU9ktQGmsktERCUdtDGnACTezEDO66M0-151Spc',
  };
};
export const studentDataStud = () => {
  return [
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
};
export const departmentDataStub = () => {
  return [
    {
      totalStudents: 5,
      totalStudentsIntake: 300,
      batch: 2021,
      availableIntake: 295,
      branches: {
        CE: {
          name: 'CE',
          totalStudents: 1,
          totalStudentsIntake: 120,
          availableIntake: 119,
        },
        ME: {
          name: 'ME',
          totalStudents: 3,
          totalStudentsIntake: 120,
          availableIntake: 117,
        },
        EC: {
          name: 'EC',
          totalStudents: 1,
          totalStudentsIntake: 60,
          availableIntake: 59,
        },
      },
    },
  ];
};
