-- Update permission format from 'resource.action' to 'resource:action'
-- This is a one-time data migration that updates existing permissions
-- Only runs if Permission table exists and has old format permissions

-- Update User permissions (only if they exist)
UPDATE "Permission" SET name = 'user:read' 
WHERE name = 'users.read' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'users.read');

UPDATE "Permission" SET name = 'user:create' 
WHERE name = 'users.write' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'users.write');

UPDATE "Permission" SET name = 'user:delete' 
WHERE name = 'users.delete' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'users.delete');

-- Update Product permissions
UPDATE "Permission" SET name = 'product:read' 
WHERE name = 'products.read' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'products.read');

UPDATE "Permission" SET name = 'product:create' 
WHERE name = 'products.write' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'products.write');

UPDATE "Permission" SET name = 'product:delete' 
WHERE name = 'products.delete' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'products.delete');

-- Update Loan permissions
UPDATE "Permission" SET name = 'loan:read' 
WHERE name = 'loans.read' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loans.read');

UPDATE "Permission" SET name = 'loan:create' 
WHERE name = 'loans.write' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loans.write');

UPDATE "Permission" SET name = 'loan:delete' 
WHERE name = 'loans.delete' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loans.delete');

-- Update Admin permissions
UPDATE "Permission" SET name = 'admin:users' 
WHERE name = 'permissions.manage' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'permissions.manage');

UPDATE "Permission" SET name = 'admin:audit' 
WHERE name = 'audit.read' AND EXISTS (SELECT 1 FROM "Permission" WHERE name = 'audit.read');

-- Add new missing permissions if they don't exist
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'user:update',
    'Update users',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'user:update')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'product:update',
    'Update products',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'product:update')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'product:manage',
    'Manage products',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'product:manage')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'loan:update',
    'Update loans',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:update')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'loan:return',
    'Return loans',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:return')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'loan:overdue',
    'Manage overdue loans',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:overdue')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'admin:full',
    'Full admin access',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'admin:full')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    'admin:system',
    'System administration',
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'admin:system')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Permission');

-- Grant new permissions to all workers (only if tables exist)
INSERT INTO "UserPermission" ("userId", "permissionId", "grantedBy")
SELECT 
    u.id,
    p.id,
    u.id
FROM "User" u
CROSS JOIN "Permission" p
WHERE u.role = 'WORKER'
AND p.name IN (
    'user:read',
    'product:read', 'product:create', 'product:update', 'product:delete', 'product:manage',
    'loan:read', 'loan:create', 'loan:update', 'loan:delete', 'loan:return', 'loan:overdue',
    'volunteer:read', 'volunteer:create', 'volunteer:update', 'volunteer:delete', 'volunteer:stats', 'volunteer:reports'
)
AND NOT EXISTS (
    SELECT 1 FROM "UserPermission" up
    WHERE up."userId" = u.id AND up."permissionId" = p.id
)
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'User')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'UserPermission');

-- Grant all permissions to all admins (only if tables exist)
INSERT INTO "UserPermission" ("userId", "permissionId", "grantedBy")
SELECT 
    u.id,
    p.id,
    u.id
FROM "User" u
CROSS JOIN "Permission" p
WHERE u.role = 'ADMIN'
AND NOT EXISTS (
    SELECT 1 FROM "UserPermission" up
    WHERE up."userId" = u.id AND up."permissionId" = p.id
)
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'User')
AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'UserPermission');
