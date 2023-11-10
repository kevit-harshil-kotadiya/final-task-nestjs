import {
  IsString,
  IsInt,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class BranchDto {
  @IsString()
  name: string;

  @IsInt()
  totalStudentsIntake: number;
}

export class DepartmentDto {
  @IsString()
  year: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10) // Set the maximum size based on your application's requirements
  @ValidateNested({ each: true })
  @Type(() => BranchDto)
  branches: BranchDto[];
}
