import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Role } from './role.enum';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<{ role: Role }> => {
    debugger;
    if (
      this.configService.get<string>('READ_AUTH.USERNAME') === username &&
      this.configService.get<string>('READ_AUTH.PASSWORD') === password
    ) {
      return {
        role: Role.USER,
      };
    } else if (
      this.configService.get<string>('WRITE_AUTH.USERNAME') === username &&
      this.configService.get<string>('WRITE_AUTH.PASSWORD') === password
    ) {
      return {
        role: Role.ADMIN,
      };
    }
    throw new UnauthorizedException();
  };
}
