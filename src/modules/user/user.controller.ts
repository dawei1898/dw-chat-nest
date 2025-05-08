import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '../../commom/interfaces/api-response.interface';
import { Auth } from '../../components/auth/auth.decorator';
import { Log } from '../../components/log/log.decoorator';
import { LoginDto } from './dto/login.dto';
import { Validated } from '../../components/validate/validated.decorator';
import { User } from '../../components/auth/login-user.decorator';
import { LoginUser } from '../../components/auth/login-user';
import { RegisterDto } from './dto/register.dto';

/**
 * 用户服务
 *
 * @author dawei
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 用户注册
   */
  @Log()
  @Validated()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const id: bigint = await this.userService.register(dto);
    return ApiResponse.success('注册成功', id.toString());
  }

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

  /**
   * 查询用户信息
   */
  @Log()
  @Auth()
  @Get('queryUser')
  async queryUser(@User() user: LoginUser) {
    const userEntity = await this.userService.queryUser(user.id);
    return ApiResponse.success(userEntity);
    /*const userEntity: UserEntity = new UserEntity();
    userEntity.id = BigInt(1212121212121212);
    userEntity.name = 'aaa';
    userEntity.password = 'dd';
    userEntity.createTime = new Date();
    return userEntity;*/
  }
}
