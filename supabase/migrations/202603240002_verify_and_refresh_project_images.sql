-- Verification and schema cache refresh after creating project_images
-- 1) Verify table exists in public schema
SELECT
    table_schema,
    table_name
FROM
    information_schema.tables
WHERE
    table_schema = 'public'
    AND table_name IN ('projects', 'project_images');

-- 2) Verify FK relationship that PostgREST needs for nested select
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM
    information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
WHERE
    tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
    AND tc.table_name = 'project_images'
    AND ccu.table_name = 'projects';

-- 3) Force PostgREST schema cache reload so relationship is visible immediately
notify pgrst,
'reload schema';