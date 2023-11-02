import {IsString } from 'class-validator';

export class AdministrationLoginDto {
    @IsString()
    administratorId: string;

    @IsString()
    password: string;
}
