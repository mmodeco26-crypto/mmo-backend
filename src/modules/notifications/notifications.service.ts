import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

interface PushPayload {
  title: string;
  body:  string;
  data?: Record<string, string>;
}

@Injectable()
export class NotificationsService implements OnModuleInit {
  private readonly logger = new Logger(NotificationsService.name);

  onModuleInit() {
    // تهيئة Firebase Admin SDK مرة واحدة فقط
    if (!admin.apps.length) {
      const projectId   = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!projectId || !clientEmail || !privateKey || privateKey.includes('YOUR_PRIVATE_KEY_HERE')) {
        this.logger.warn(
          '⚠️  Firebase credentials not configured or placeholder — Push Notifications running in Mock Mode',
        );
        return;
      }

      try {
        admin.initializeApp({
          credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
        });
        this.logger.log('✅ Firebase Admin SDK initialized');
      } catch (err: any) {
        this.logger.warn(`⚠️ Firebase init skipped: ${err.message}`);
      }
    }
  }

  /** إرسال إشعار لجهاز واحد */
  async sendOne(token: string, payload: PushPayload): Promise<void> {
    if (!admin.apps.length) return;
    try {
      await admin.messaging().send({
        token,
        notification: { title: payload.title, body: payload.body },
        data:         payload.data,
        android:      { priority: 'high' },
        apns:         { payload: { aps: { contentAvailable: true } } },
      });
      this.logger.debug(`FCM sent to: ${token.slice(0, 20)}...`);
    } catch (err: any) {
      this.logger.error(`FCM sendOne failed: ${err.message}`);
    }
  }

  /** إرسال إشعار لمجموعة أجهزة (حتى 500 token في الطلب الواحد) */
  async sendMulticast(tokens: string[], payload: PushPayload): Promise<void> {
    if (!admin.apps.length || tokens.length === 0) return;
    try {
      const result = await admin.messaging().sendEachForMulticast({
        tokens,
        notification: { title: payload.title, body: payload.body },
        data:         payload.data,
        android:      { priority: 'high' },
      });
      this.logger.log(
        `FCM Multicast → success: ${result.successCount}, failed: ${result.failureCount}`,
      );
    } catch (err: any) {
      this.logger.error(`FCM multicast failed: ${err.message}`);
    }
  }
}
