import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('sold-using-buy-now/:email')
  async sendSoldUsingBuyNow(@Param('email') email: string) {
    try {
      await this.mailService.sendSoldUsingBuyNow(email);

      return new HttpException(
        {
          success: true,
          message: 'Email sent.',
        },
        HttpStatus.OK,
      );
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          success: false,
          message: 'Email failed.',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get('listing-has-expired/:email')
  async sendListingHasExpired(@Param('email') email: string) {
    try {
      await this.mailService.sendListingHasExpired(email);

      return new HttpException(
        {
          success: true,
          message: 'Email sent.',
        },
        HttpStatus.OK,
      );
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          success: false,
          message: 'Email failed.',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get('listing-question/:email')
  async sendListingQuestion(@Param('email') email: string) {
    try {
      await this.mailService.sendListingQuestion(email);

      return new HttpException(
        {
          success: true,
          message: 'Email sent.',
        },
        HttpStatus.OK,
      );
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          success: false,
          message: 'Email failed.',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
