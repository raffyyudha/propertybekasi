
-- 1. Create properties table if it doesn't exist
create table if not exists public.properties (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  price numeric not null,
  location text not null,
  type text not null,
  land_area numeric not null,
  building_area numeric not null,
  bedrooms numeric,
  bathrooms numeric,
  images text[] default '{}'::text[],
  description text,
  is_featured boolean default false,
  is_promo boolean default false
);

-- 2. Add detailed columns (safe to run even if table exists)
alter table public.properties 
add column if not exists floors numeric,
add column if not exists carport numeric,
add column if not exists electricity numeric,
add column if not exists water text,
add column if not exists orientation text,
add column if not exists certificate text,
add column if not exists furniture text,
add column if not exists year_built numeric;

-- 3. Enable RLS
alter table public.properties enable row level security;

-- 4. Create policies (drop existing ones first to avoid errors)
drop policy if exists "Allow public read access" on public.properties;
create policy "Allow public read access" on public.properties for select to public using (true);

drop policy if exists "Allow authenticated insert" on public.properties;
create policy "Allow authenticated insert" on public.properties for insert to authenticated with check (true);

drop policy if exists "Allow authenticated update" on public.properties;
create policy "Allow authenticated update" on public.properties for update to authenticated using (true);

drop policy if exists "Allow authenticated delete" on public.properties;
create policy "Allow authenticated delete" on public.properties for delete to authenticated using (true);

-- 5. Storage handling
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select using ( bucket_id = 'property-images' );

drop policy if exists "Authenticated Upload" on storage.objects;
create policy "Authenticated Upload" on storage.objects for insert to authenticated with check ( bucket_id = 'property-images' );
