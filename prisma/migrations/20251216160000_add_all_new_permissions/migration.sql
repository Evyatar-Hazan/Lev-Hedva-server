-- Add missing permissions with correct format if they don't exist
-- This migration ensures all required permissions exist in the database

-- Insert User permissions
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'user:read', 'Read users', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'user:read');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'user:create', 'Create users', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'user:create');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'user:update', 'Update users', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'user:update');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'user:delete', 'Delete users', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'user:delete');

-- Insert Product permissions
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'product:read', 'Read products', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'product:read');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'product:create', 'Create products', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'product:create');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'product:update', 'Update products', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'product:update');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'product:delete', 'Delete products', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'product:delete');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'product:manage', 'Manage products', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'product:manage');

-- Insert Loan permissions
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'loan:read', 'Read loans', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:read');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'loan:create', 'Create loans', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:create');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'loan:update', 'Update loans', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:update');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'loan:delete', 'Delete loans', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:delete');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'loan:return', 'Return loans', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:return');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'loan:overdue', 'Manage overdue loans', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'loan:overdue');

-- Insert Volunteer permissions
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'volunteer:read', 'Read volunteer activities', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'volunteer:read');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'volunteer:create', 'Create volunteer activities', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'volunteer:create');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'volunteer:update', 'Update volunteer activities', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'volunteer:update');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'volunteer:delete', 'Delete volunteer activities', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'volunteer:delete');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'volunteer:stats', 'View volunteer statistics', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'volunteer:stats');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'volunteer:reports', 'Generate volunteer reports', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'volunteer:reports');

-- Insert Admin permissions
INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'admin:full', 'Full admin access', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'admin:full');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'admin:users', 'Manage users', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'admin:users');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'admin:system', 'System administration', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'admin:system');

INSERT INTO "Permission" (id, name, description, "createdAt", "updatedAt")
SELECT gen_random_uuid(), 'admin:audit', 'Audit logs access', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM "Permission" WHERE name = 'admin:audit');

-- Assign all worker permissions to all users with WORKER role
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
);

-- Assign all permissions to all users with ADMIN role
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
);