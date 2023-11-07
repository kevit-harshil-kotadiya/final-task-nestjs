// customTypes.ts

export type Branches = {
  [key: string]: number;
};

export type StudentData = {
  totalStudents: number;
  year: number;
  branches: Branches;
};

export type listStudentType = StudentData[];
