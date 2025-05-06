import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '../../commom/interfaces/response.interface';
import { Auth } from '../../components/auth/auth.decorator';
import { Log } from '../../components/log/log.decoorator';
import { LoginDto } from './dto/login.dto';
import { Validated } from '../../components/validate/validated.decorator';
import { User } from '../../components/auth/login-user.decorator';
import { LoginUser } from '../../components/auth/login-user';

/**
 * 用户服务
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 用户登录
   */
  @Log()
  @Validated()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<string>> {
    const token = await this.userService.login(
      loginDto.username,
      loginDto.password,
    );
    return ApiResponse.success('登录成功', token);
  }

  /**
   * 退出登录
   */
  @Log()
  @Auth()
  @Delete('logout')
  async logout(@User() user: LoginUser): Promise<ApiResponse<string>> {
    const result = await this.userService.logout(user);
    if (result) {
      return ApiResponse.success('退出成功');
    } else {
      return ApiResponse.fail('退出失败');
    }
  }
}
