import { IsNumber, IsString } from 'class-validator';

export class StudentDto {
  @IsString()
  name: string;
  @IsString()
  studentId: string;
  @IsNumber()
  phoneNumber: number;
  @IsString()
  password: string;
  @IsNumber()
  currentSem: number;
  @IsString()
  department: string;
  @IsNumber()
  batch: number;
}
