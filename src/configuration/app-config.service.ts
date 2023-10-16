import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}
    get port(): number {
        return this.configService.get<number>('app.APP_PORT');
    }

    get smtpHost(): string {
        return this.configService.get<string>('app.SMTP_HOST');
    }

    get smtpPort(): number {
        return this.configService.get<number>('app.SMTP_PORT');
    }

    get smtpUser(): string {
        return this.configService.get<string>('app.SMTP_USER');
    }

    get smtpPass(): string {
        return this.configService.get<string>('app.SMTP_PASS');
    }

    get isSecureSetup(): boolean {
        return this.configService.get<string>('app.SECURE_SETUP') == 'true';
    }

}