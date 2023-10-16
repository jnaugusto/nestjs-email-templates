import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { AppConfigModule } from '../configuration/app-config.module';
import { AppConfigService } from '../configuration/app-config.service';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        transport: {
          host: appConfigService.smtpHost,
          auth: {
            user: appConfigService.smtpUser,
            pass: appConfigService.smtpPass,
          },
          port: appConfigService.smtpPort,
          secure: appConfigService.isSecureSetup,
        },
        defaults: {
          from: '"No Reply" <jessnoelaugusto@gmail.com>',
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: path.join(__dirname, 'templates/base/partials'),
            options: {
              strict: true,
            },
          },
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
