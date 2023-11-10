import { IsString } from 'class-validator';

export class AbsentStudentDto {
    @IsString()
    date: string;
}