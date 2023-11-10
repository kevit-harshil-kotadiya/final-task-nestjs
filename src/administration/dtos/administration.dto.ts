import { IsString } from 'class-validator';

export class AdministrationDto {
  @IsString()
  administratorId: string;

  @IsString()
  administratorName: string;

  @IsString()
  profile: string;

  @IsString()
  password: string;
}
