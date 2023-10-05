import * as classVal from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @classVal.IsEmail()
  email: string;

  @classVal.IsString()
  name: string;

  @classVal.IsString()
  @classVal.MinLength(4)
  @classVal.MaxLength(20)
  @classVal.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
