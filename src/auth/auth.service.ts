import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 📌 Регистрация нового пользователя
  async register(email: string, password: string, username: string) {
    try {
      const hash = await bcrypt.hash(password, 10);
      return await this.prisma.user.create({
        data: { email, password: hash, username },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }
      throw error;
    }
  }

  // 🔐 Авторизация и генерация JWT токена
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Неверный пароль');

    // 📌 Добавляем username в payload, чтобы он был доступен во всех местах
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
