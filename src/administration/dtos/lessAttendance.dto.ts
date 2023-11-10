import {IsNumber} from 'class-validator';

export class LessAttendanceDto {
    @IsNumber()
    sem: number;
}