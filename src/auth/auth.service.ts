import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(user) {
    const { username, password } = user;
    return await this.usersService.findUsername(username)
      .then(async (result) => {
        
        if (result) {
          const decryption = await bcrypt.compare(password, result.password);
          if (decryption) {
            return result.token;
          } else {
            return new NotFoundException();
          }
        } else {
          return new NotFoundException();
        }
      })
      .catch((e) => {
        return new NotFoundException();
      });
  }
}
