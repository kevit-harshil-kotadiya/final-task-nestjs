import {IsNumber, IsString} from 'class-validator';

export class GetDepartmentDto {
    @IsNumber()
    year: number;
}