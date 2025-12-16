# הוראות Deployment אוטומטי ל-Render

## סקירה כללית

הפרויקט מוגדר להריץ אוטומטית את עדכון ההרשאות בכל deployment ב-Render, ללא צורך בהתערבות ידנית.

## איך זה עובד?

### 1. Build Command (בקובץ `render.yaml`)

```yaml
buildCommand: |
  npm install
  npx prisma generate
  npm run build
  npm run postdeploy  # ← מריץ אוטומטית את עדכון ההרשאות
```

### 2. Scripts ב-package.json

```json
{
  "scripts": {
    "postdeploy": "npm run prisma:generate && npm run migrate:permissions",
    "migrate:permissions": "ts-node prisma/migrations/update-permissions.ts"
  }
}
```

## מה קורה בכל Deployment?

1. ✅ Render מושך את הקוד מ-GitHub
2. ✅ מתקין את ה-dependencies (`npm install`)
3. ✅ מייצר את Prisma Client (`npx prisma generate`)
4. ✅ בונה את הפרויקט (`npm run build`)
5. ✅ **מריץ אוטומטית את `npm run postdeploy`**
6. ✅ עדכון ההרשאות רץ אוטומטית (`migrate:permissions`)
7. ✅ מריץ את ה-migrations (`npx prisma migrate deploy`)
8. ✅ מפעיל את השרת (`npm run start:prod`)

## יתרונות

- 🎯 **אוטומטי לחלוטין** - לא צריך להריץ פקודות ידנית
- 🔒 **בטוח** - הסקריפט idempotent ולא ישבור דברים
- 🚀 **מהיר** - רץ כחלק מתהליך ה-build
- 📦 **שומר נתונים** - לא מוחק משתמשים או מוצרים

## הגדרות ב-Render Dashboard

אם לא משתמש בקובץ `render.yaml`, הגדר ידנית:

### Build Command
```bash
npm install && npx prisma generate && npm run build && npm run postdeploy
```

### Start Command
```bash
npx prisma migrate deploy && npm run start:prod
```

## בדיקה ידנית (אם צריך)

אם בכל זאת רוצה להריץ ידנית ב-Render Shell:

```bash
# התחבר ל-Shell של Render
npm run migrate:permissions
```

## Troubleshooting

### אם הסקריפט לא רץ אוטומטית

1. בדוק ש-`ts-node` מותקן ב-dependencies (לא devDependencies)
2. בדוק את ה-logs של Render build
3. ודא שקובץ `prisma/migrations/update-permissions.ts` קיים בגיט

### אם יש שגיאות

הסקריפט בטוח להרצה מרובה - אפשר פשוט להריץ שוב:
```bash
npm run migrate:permissions
```

## עדכונים עתידיים

כשיש צורך בעדכון הרשאות חדש:

1. ✅ עדכן את קובץ `update-permissions.ts`
2. ✅ עשה commit ו-push
3. ✅ Render ידאג לשאר אוטומטית! 🎉

## סיכום

עכשיו כל פעם שאתה עושה push לגיט, Render:
- מריץ deployment חדש
- מעדכן אוטומטית את ההרשאות
- הכל עובד מבלי שתצטרך לעשות כלום! ✨
