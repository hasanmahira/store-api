import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    // For login verification
    const isPasswordValid = await this.verifyPassword(pass, user.password);

    if (isPasswordValid && user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, email: user.email, permissions: user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Function to verify a password during login
  async verifyPassword(enteredPassword: string, storedHashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
  }
}
