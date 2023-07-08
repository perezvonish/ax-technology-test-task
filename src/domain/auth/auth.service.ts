import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {UsersService} from "../users/users.service";
import {UsersEntity} from "../users/users.entity";
import {AuthLoginRequest, AuthRegisterRequest} from "../../application/dto/auth/auth.request";
import {I18nService} from "nestjs-i18n";
import {AuthLoginResponse, AuthRegisterResponse} from "../../application/dto/auth/auth.response";
import {AuthJwtSign} from "../../application/dto/auth/auth.interface";

@Injectable()
export class AuthService {
    private readonly saltRounds: number = Number(
        this.configService.get('BCRYPT_SALT_ROUNDS'),
    );

    constructor(
        private readonly configService: ConfigService,
        private jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly i18n: I18nService
    ) {}

    async register(data: AuthRegisterRequest): Promise<AuthRegisterResponse> {
        if (!this.checkPasswordRepeat(data.password, data.passwordRepeat)) {
            throw new ForbiddenException(this.i18n.t('en.exceptions.auth.register.notTheSame'))
        }

        const candidate = await this.userService.findOne({where: {email: data.email}});
        if (candidate) {
            throw new NotFoundException(this.i18n.t('en.exceptions.user.notFound'))
        }

        const hashPassword = await this.hashPassword(data.password);

        const newUser = new UsersEntity(
            data.email,
            hashPassword
        );
        const user = await this.userService.save(newUser);

        return new AuthRegisterResponse(user);
    }

    async login({email, password}: AuthLoginRequest): Promise<AuthLoginResponse> {
        const candidate = await this.userService.findOne({where: {email}});

        if (!candidate) {
            throw new NotFoundException(this.i18n.t('en.exceptions.user.notFound'))
        }

        const verifyPassword = await this.comparePassword(
            password,
            candidate.password,
        );

        if (!verifyPassword) {
            throw new ForbiddenException(this.i18n.t('en.exceptions.auth.login.passwordIncorrect'))
        }

        const payload: AuthJwtSign = {
            id: candidate.id,
            email: candidate.email,
        };
        return await this.signIn(payload);
    }

    private async signIn(payload: AuthJwtSign): Promise<AuthLoginResponse> {
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, this.saltRounds);
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }

    private checkPasswordRepeat(password: string, newPassword: string): boolean {
        return password === newPassword
    }
}
