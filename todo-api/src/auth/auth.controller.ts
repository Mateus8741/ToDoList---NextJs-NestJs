import * as common from '@nestjs/common';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { AuthRequest } from 'src/models/AuthRequest';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@common.Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @common.UseGuards(LocalAuthGuard)
  @common.Post('login')
  @common.HttpCode(common.HttpStatus.OK)
  async login(@common.Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
