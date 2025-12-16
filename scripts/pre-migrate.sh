#!/bin/bash
# Pre-migration script to handle failed migrations automatically
# This runs before prisma migrate deploy to clean up any failed migration state

echo "🔍 Checking for failed migrations..."

# Try to get migration status
MIGRATION_STATUS=$(npx prisma migrate status 2>&1 || true)

# Check if there's a failed migration
if echo "$MIGRATION_STATUS" | grep -q "migration started at"; then
    echo "⚠️  Found failed migration, attempting to resolve..."
    
    # Extract the failed migration name
    FAILED_MIGRATION=$(echo "$MIGRATION_STATUS" | grep "migration started at" | awk '{print $2}' | sed 's/`//g')
    
    if [ -n "$FAILED_MIGRATION" ]; then
        echo "📌 Marking migration as rolled back: $FAILED_MIGRATION"
        npx prisma migrate resolve --rolled-back "$FAILED_MIGRATION" || true
        echo "✅ Migration marked as rolled back"
    fi
elif echo "$MIGRATION_STATUS" | grep -q "migrations found"; then
    echo "✅ No failed migrations found"
else
    echo "ℹ️  Unable to determine migration status (might be first deployment)"
fi

echo "🚀 Ready to apply migrations"
