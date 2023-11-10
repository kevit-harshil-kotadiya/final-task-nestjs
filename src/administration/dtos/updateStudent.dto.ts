import {IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    name: string;
    @IsString()
    @IsOptional()
    studentId: string;
    @IsNumber()
    @IsOptional()
    phoneNumber: number;
    @IsString()
    @IsOptional()
    password: string;
    @IsNumber()
    @IsOptional()
    currentSem: number;
    @IsString()
    @IsOptional()
    department: string;
    @IsNumber()
    @IsOptional()
    batch: number;
}