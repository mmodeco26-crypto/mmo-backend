import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminService } from './admin.service';
import { CreateDriverAdminDto } from './dto/create-driver-admin.dto';

@ApiTags('Admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'agent')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'إحصائيات المنصة الحية (الأرباح، حجم الطلبات، السائقين المتصلين)' })
  @Get('analytics')
  getAnalytics() {
    return this.adminService.getDashboardAnalytics();
  }

  @ApiOperation({ summary: 'قائمة السائقين بانتظار التوثيق واعتماد الوثائق (KYC)' })
  @Get('drivers/kyc-pending')
  getPendingKYCDrivers() {
    return this.adminService.getPendingKYCDrivers();
  }

  @ApiOperation({ summary: 'اعتماد أو رفض سائق (KYC Approval/Rejection)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['approved', 'rejected'], example: 'approved' },
        reason: { type: 'string', example: 'رخصة السياقة غير واضحة', description: 'سبب الرفض إن وجد' },
      },
      required: ['status'],
    },
  })
  @Patch('drivers/:id/kyc')
  verifyDriver(
    @Param('id') id: string,
    @Body() body: { status: 'approved' | 'rejected'; reason?: string },
  ) {
    return this.adminService.verifyDriverKYC(id, body.status, body.reason);
  }

  @ApiOperation({ summary: 'تجميد أو إلغاء تجميد حساب مستخدم (Block / Unblock)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        is_active: { type: 'boolean', example: false, description: 'false للحظر، true للتنشيط' },
      },
      required: ['is_active'],
    },
  })
  @Patch('users/:id/status')
  toggleBlockUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { is_active: boolean },
  ) {
    return this.adminService.toggleUserBlock(id, body.is_active);
  }

  @ApiOperation({ summary: 'إضافة دراج / سائق جديد مباشرة إلى المنصة (Ajouter Livreur)' })
  @Post('drivers')
  createDriver(@Body() dto: CreateDriverAdminDto) {
    return this.adminService.createDriver(dto);
  }

  @ApiOperation({ summary: 'تجميد مؤقت لعمل السائق أو إعادة تفعيله (Suspend / Unsuspend Livreur)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        is_suspended: { type: 'boolean', example: true, description: 'true للتجميد المؤقت، false لإلغاء التجميد' },
        reason: { type: 'string', example: 'مخالفة معايير الجودة', description: 'سبب التجميد الإداري' },
      },
      required: ['is_suspended'],
    },
  })
  @Patch('drivers/:id/suspend')
  suspendDriver(
    @Param('id') id: string,
    @Body() body: { is_suspended: boolean; reason?: string },
  ) {
    return this.adminService.suspendDriver(id, body.is_suspended, body.reason);
  }

  @ApiOperation({ summary: 'قائمة السائقين التفصيلية مع حالة الديون والتقييمات' })
  @Get('drivers')
  getAllDrivers() {
    return this.adminService.getAllDrivers();
  }

  @ApiOperation({ summary: 'قائمة جميع الزبائن (Clients) مع سجل طلباتهم وإنفاقهم' })
  @Get('clients')
  getAllClients() {
    return this.adminService.getAllClients();
  }

  @ApiOperation({ summary: 'إضافة زبون جديد مباشرة من لوحة التحكم (Ajouter Client)' })
  @Post('clients')
  createClient(
    @Body() body: { name: string; phone: string; password?: string; email?: string },
  ) {
    return this.adminService.createClient(body);
  }

  @ApiOperation({ summary: 'جلب إعدادات المنصة الحالية (الأسعار، عمولة التطبيق، سقف الديون)' })
  @Get('settings')
  getSettings() {
    return this.adminService.getPlatformSettings();
  }

  @ApiOperation({ summary: 'تعديل وحفظ إعدادات المنصة والتسعيرة والعمولات' })
  @Roles('admin')
  @Patch('settings')
  updateSettings(
    @Body()
    body: {
      base_fee?: number;
      per_km_rate?: number;
      min_order_price?: number;
      commission_rate?: number;
      default_debt_limit?: number;
      surge_multiplier?: number;
    },
  ) {
    return this.adminService.updatePlatformSettings(body);
  }

  @ApiOperation({ summary: 'جلب جميع أكواد الخصم والعروض الترويجية' })
  @Get('promos')
  getAllPromos() {
    return this.adminService.getAllPromoCodes();
  }

  @ApiOperation({ summary: 'إنشاء كود خصم جديد (Créer Code Promo)' })
  @Roles('admin')
  @Post('promos')
  createPromo(
    @Body()
    body: {
      code: string;
      discount_type: 'percentage' | 'fixed';
      discount_value: number;
      max_discount?: number;
      min_order_price?: number;
      usage_limit?: number;
      expires_at?: string;
    },
  ) {
    return this.adminService.createPromoCode(body);
  }

  @ApiOperation({ summary: 'تفعيل أو تعطيل كود الخصم (Activer / Désactiver Promo)' })
  @Roles('admin')
  @Patch('promos/:id/status')
  togglePromoStatus(
    @Param('id') id: string,
    @Body() body: { is_active: boolean },
  ) {
    return this.adminService.togglePromoStatus(id, body.is_active);
  }

  @ApiOperation({ summary: 'حذف كود الخصم (Supprimer Promo)' })
  @Roles('admin')
  @Delete('promos/:id')
  deletePromo(@Param('id') id: string) {
    return this.adminService.deletePromoCode(id);
  }

  @ApiOperation({ summary: 'الملف الشخصي للمستخدم الحالي (Current Admin / Agent Profile)' })
  @Get('me')
  getProfile(@Request() req: any) {
    return this.adminService.getCurrentUserProfile(req.user.sub);
  }

  @ApiOperation({ summary: 'قائمة فريق العمل والوكلاء (Staff / Agents & Admins)' })
  @Get('agents')
  getAllAgents() {
    return this.adminService.getAllAgents();
  }

  @ApiOperation({ summary: 'إضافة وكيل أو مسؤول جديد لفريق العمل (Créer Agent / Admin)' })
  @Roles('admin')
  @Post('agents')
  createAgent(
    @Body()
    body: {
      name: string;
      phone: string;
      password?: string;
      email?: string;
      role?: 'admin' | 'agent';
    },
  ) {
    return this.adminService.createAgent(body);
  }

  @ApiOperation({ summary: 'تفعيل أو تعطيل حساب وكيل (Activer / Désactiver Agent)' })
  @Roles('admin')
  @Patch('agents/:id/status')
  toggleAgentStatus(
    @Param('id') id: string,
    @Body() body: { is_active: boolean },
    @Request() req: any,
  ) {
    return this.adminService.toggleAgentStatus(id, body.is_active, req.user.sub);
  }

  @ApiOperation({ summary: 'حذف حساب وكيل نهائياً (Supprimer Agent)' })
  @Roles('admin')
  @Delete('agents/:id')
  deleteAgent(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.adminService.deleteAgent(id, req.user.sub);
  }

  @ApiOperation({ summary: 'إعادة تعيين وتغيير كلمة المرور لحساب وكيل (Reset Agent Password)' })
  @Roles('admin')
  @Patch('agents/:id/password')
  resetAgentPassword(
    @Param('id') id: string,
    @Body() body: { password?: string; new_password?: string },
  ) {
    const pass = body.password || body.new_password || '';
    return this.adminService.resetAgentPassword(id, pass);
  }
}
