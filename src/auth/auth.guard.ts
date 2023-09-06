import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return false;
    }

    const tokenValue = token.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(tokenValue, {
        secret: `${process.env.JWT_SECRET_KEY}`,
      });

      // Store the entire user object from the JWT payload in request.user
      request.user = decoded;

      return true;
    } catch (error) {
      return false;
    }
  }
}
