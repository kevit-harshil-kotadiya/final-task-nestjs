import {IsNumber, IsString} from 'class-validator';

export class StudentDto {
  @IsString()
  name: string;
  @IsString()
  studentId: string;
  @IsNumber()
  phoneNumber: string;
  @IsString()
  password: string;
  @IsNumber()
  currentSem: string;
  @IsString()
  department: string;
  @IsNumber()
  batch: string;
}
