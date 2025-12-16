# 📚 תיעוד Server - Lev-Hedva

תיעוד עבור שרת NestJS (Backend).

## 🏗️ מבנה הפרויקט

```
Lev-Hedva-sever/
├── src/
│   ├── modules/         # מודולים עיקריים
│   │   ├── auth/       # אימות והרשאות
│   │   ├── users/      # ניהול משתמשים
│   │   ├── products/   # ניהול מוצרים
│   │   ├── loans/      # ניהול השאלות
│   │   ├── volunteers/ # ניהול מתנדבים
│   │   └── audit/      # מעקב ולוגים
│   ├── common/         # Guards, Interceptors, DTOs
│   ├── prisma/         # Prisma service
│   └── main.ts         # נקודת כניסה
├── prisma/
│   ├── schema.prisma   # סכמת בסיס הנתונים
│   ├── migrations/     # migrations
│   └── seed.ts         # נתוני התחלה
└── scripts/           # סקריפטים שימושיים
```

## 🛠️ טכנולוגיות

- **NestJS** - Node.js framework
- **Prisma** - ORM לניהול בסיס נתונים
- **PostgreSQL** - בסיס נתונים
- **JWT** - אימות משתמשים
- **Passport** - אסטרטגיות אימות
- **TypeScript** - שפת פיתוח
- **Jest** - מסגרת בדיקות

## 🚀 פקודות שימושיות

```bash
# פיתוח
npm run start:dev

# בנייה
npm run build

# בדיקות
npm test
npm run test:e2e

# Prisma
npx prisma migrate dev      # הרצת migrations
npx prisma studio          # UI לבסיס נתונים
npx prisma generate        # יצירת Prisma Client

# ניהול admin
npm run create-admin       # יצירת משתמש admin
npm run reset-admin        # איפוס סיסמת admin
```

## 🗄️ בסיס נתונים

### מודלים עיקריים
- **User** - משתמשים ומנהלים
- **Volunteer** - מתנדבים
- **Product** - מוצרים
- **ProductInstance** - מופעי מוצרים
- **Loan** - השאלות
- **AuditLog** - לוג פעולות

### Migrations
כל ה-migrations נמצאים ב-`prisma/migrations/`

## 🔐 אבטחה

- JWT tokens לאימות
- Role-based access control (RBAC)
- Password hashing עם bcrypt
- Audit logging לכל פעולה
- CORS configuration

## 🔗 קישורים

- [README ראשי](../README.md)
- [תיעוד כללי](../../docs/)
- [תיעוד קליינט](../../Lev-Hedva-client/docs/)

## 📡 API Documentation

השרת מריץ Swagger UI ב-`http://localhost:3001/api` (בסביבת פיתוח).

---

**טיפ:** השתמש ב-`npm run create-admin` ליצירת משתמש admin ראשון אחרי התקנה.
