import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@ApiBearerAuth('JWT-auth')
@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({ summary: 'عرض رصيد المحفظة والحد الائتماني للديون' })
  @Get('me')
  getMyWallet(@Req() req: any) {
    return this.walletService.getOrCreateWallet(req.user.sub);
  }

  @ApiOperation({ summary: 'سجل حركات ومعاملات المحفظة' })
  @Get('transactions')
  getTransactions(@Req() req: any) {
    return this.walletService.getTransactions(req.user.sub);
  }

  @ApiOperation({ summary: 'شحن رصيد المحفظة وتسديد مستحقات المنصة' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 1000, description: 'مبلغ الشحن' },
        reference: { type: 'string', example: 'بريدي موب / BaridiMob' },
      },
      required: ['amount'],
    },
  })
  @Post('top-up')
  topUp(
    @Req() req: any,
    @Body() body: { amount: number; reference?: string },
  ) {
    return this.walletService.topUpWallet(req.user.sub, body.amount, body.reference);
  }
}
