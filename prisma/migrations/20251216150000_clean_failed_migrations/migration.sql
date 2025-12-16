-- Clean up failed migration records from _prisma_migrations table
-- This is a one-time cleanup to allow fresh migrations to run

-- Delete the failed migration record if it exists
DELETE FROM "_prisma_migrations" 
WHERE migration_name = '20251216130854_update_permissions_format'
AND finished_at IS NULL;

-- Also delete it if it finished with errors
DELETE FROM "_prisma_migrations" 
WHERE migration_name = '20251216130854_update_permissions_format';