#!/bin/bash
# Pre-migration script to handle failed migrations automatically
# This runs before prisma migrate deploy to clean up any failed migration state

echo "🔍 Checking for failed migrations..."

# Try to get migration status
MIGRATION_STATUS=$(npx prisma migrate status 2>&1 || true)

echo "Migration status output:"
echo "$MIGRATION_STATUS"
echo "---"

# Check if there's a failed migration (P3009 error)
if echo "$MIGRATION_STATUS" | grep -q "P3009"; then
    echo "⚠️  Found failed migration (P3009), attempting to resolve..."
    
    # Extract the failed migration name - look for pattern like `20251216130854_update_permissions_format`
    FAILED_MIGRATION=$(echo "$MIGRATION_STATUS" | grep -oP '`\K[^`]+(?=` migration)' | head -1)
    
    if [ -n "$FAILED_MIGRATION" ]; then
        echo "📌 Marking migration as rolled back: $FAILED_MIGRATION"
        npx prisma migrate resolve --rolled-back "$FAILED_MIGRATION" || true
        echo "✅ Migration marked as rolled back"
    else
        echo "❌ Could not extract migration name from error"
    fi
elif echo "$MIGRATION_STATUS" | grep -q "migrations found"; then
    echo "✅ No failed migrations found"
else
    echo "ℹ️  Unable to determine migration status (might be first deployment)"
fi

echo "🚀 Ready to apply migrations"
