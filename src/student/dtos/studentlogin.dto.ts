import { IsString } from 'class-validator';

export class StudentloginDto {
  @IsString()
  studentId: string;

  @IsString()
  password: string;
}
