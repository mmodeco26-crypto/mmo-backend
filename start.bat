@echo off
chcp 65001 >nul
echo ========================================================
echo    🏍️ Moto Delivery Platform - تشغيل المنظومة
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] جاري تشغيل الـ Migrations لقاعدة البيانات...
call npm run migrate
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ تنبيه: لم يتم الاتصال بقاعدة البيانات.
    echo تأكد من تشغيل PostgreSQL وتطابق البيانات في ملف .env
    echo.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] جاري ملء البيانات التجريبية (Seeding)...
call npm run seed

echo.
echo [3/3] جاري تشغيل السيرفر (NestJS + Swagger + WebSockets)...
echo 📑 Swagger Docs:         http://localhost:3000/api/docs
echo 🏍️  API Base URL:         http://localhost:3000/api/v1
echo 🌐 Web Live Simulator:   افتح ملف simulator.html في المتصفح!
echo.
call npm run start:dev

pause
