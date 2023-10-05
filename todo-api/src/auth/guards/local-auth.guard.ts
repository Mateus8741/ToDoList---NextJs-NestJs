import * as common from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@common.Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: common.ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new common.UnauthorizedException(err?.message);
    }

    return user;
  }
}
