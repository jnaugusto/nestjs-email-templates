import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import moment from 'moment';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private async sendEmail(to: string, subject: string, templateData: any) {
    return await this.mailerService.sendMail({
      to: to,
      subject: subject,
      template: './base/base-template',
      context: templateData,
    });
  }

  private compileTemplate(templatePath: string, templateData: object) {
    const emailContent = fs.readFileSync(path.join(__dirname, '..', 'mail/templates', templatePath), 'utf8');
    const templateCompile = handlebars.compile(emailContent);
    return templateCompile(templateData);
  }

  async sendSoldUsingBuyNow(to: string) {
    const subject = 'Sold using buy now';
    const templateData = {
      firstName: 'Adam',
      item: {
        itemName: 'Rainbow Six Extraction PS5 - Brand New',
        itemLink: '#'
      },
      referenceNumber: '123',
      price: '$1,099.00',
      subTotal: '$1,099.00',
      shipping: '$0.00',
      totalToPay: '$1,099.00',
      buyer: {
        buyerUserName: 'marketplace-user',
        buyerEmail: 'marketplace-user@gmail.com',
        buyerLink: '#'
      },
      successFee: '$65.11 (Debited from your Marketplace account)',
      shippingDetails: {
        shippingMethod: 'Nationwide courier with tracking',
        deliveryAddress: {
          street: '123 Some Road',
          subLocality: 'Auckland CBD',
          locality: 'Auckland',
          postalCode: '1010',
          country: 'New Zealand'
        },
        phoneNumber: '0123456789'
      }
    }
    const templatePath = 'emails/sold-using-buy-now.hbs';
    const htmlEmailContent = this.compileTemplate(templatePath, templateData);

    return await this.sendEmail(to, subject, {
      bodyHeader: subject,
      bodyContent: htmlEmailContent,
    });
  }

  async sendListingHasExpired(to: string) {
    const subject = 'Listing has expired';
    const templateData = {
      firstName: 'Adam',
      item: {
        itemName: 'Rainbow Six Extraction PS5 - Brand New',
        itemLink: '#'
      },
      referenceNumber: '123',
      price: '$1,099.00',
      listingViews: '123',
      listingWatchlist: '4'
    }
    const templatePath = 'emails/listing-has-expired.hbs';
    const htmlEmailContent = this.compileTemplate(templatePath, templateData);

    return await this.sendEmail(to, subject, {
      bodyHeader: subject,
      bodyContent: htmlEmailContent,
    });
  }

  async sendListingQuestion(to: string) {
    const subject = 'A question has been asked on your listing';
    const templateData = {
      firstName: 'Adam',
      item: {
        itemName: 'Rainbow Six Extraction PS5 - Brand New',
        itemLink: '#'
      },
      listingQuestion: `Hiya! I'd be happy to buy now for $920 and transfer you asap, let me know :) cheers`,
      user: {
        userName: 'ameno3',
        userLink: '#'
      },
      dateTimePosted: moment().format('H:mm, ddd D MMM')
    }
    const templatePath = 'emails/listing-question.hbs';
    const htmlEmailContent = this.compileTemplate(templatePath, templateData);

    return await this.sendEmail(to, subject, {
      bodyHeader: subject,
      bodyContent: htmlEmailContent,
    });
  }
}
