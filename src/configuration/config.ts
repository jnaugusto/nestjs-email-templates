import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    APP_PORT: process.env.APP_PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SECURE_SETUP: process.env.SECURE_SETUP ?? 'true'
}));