
-- Create properties table
create table public.properties (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  price numeric not null,
  location text not null,
  type text not null, -- 'Rumah', 'Ruko', 'Tanah', 'Villa', 'Gudang'
  land_area numeric not null,
  building_area numeric not null,
  bedrooms numeric,
  bathrooms numeric,
  images text[] default '{}'::text[],
  description text,
  is_featured boolean default false,
  is_promo boolean default false
);

-- Enable Row Level Security (RLS)
alter table public.properties enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.properties
  for select
  to public
  using (true);

-- Create policy to allow authenticated users (admin) to insert/update/delete
create policy "Allow authenticated insert"
  on public.properties
  for insert
  to authenticated
  with check (true);

create policy "Allow authenticated update"
  on public.properties
  for update
  to authenticated
  using (true);

create policy "Allow authenticated delete"
  on public.properties
  for delete
  to authenticated
  using (true);

-- Create storage bucket for property images if it doesn't exist
-- Note: You might need to do this via Supabase UI if SQL restricted
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'property-images' );

create policy "Authenticated Upload"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'property-images' );
