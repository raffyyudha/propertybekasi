
-- Add new columns to properties table
alter table public.properties 
add column if not exists floors numeric,
add column if not exists carport numeric,
add column if not exists electricity numeric,
add column if not exists water text,
add column if not exists orientation text,
add column if not exists certificate text,
add column if not exists furniture text,
add column if not exists year_built numeric,
add column if not exists map_url text,
add column if not exists nearby_access text;
