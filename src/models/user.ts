import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  role: string;
}
