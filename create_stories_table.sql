-- Create stories table for mobile feed/carousel
create table if not exists public.stories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text, -- Optional title
  image_url text not null, -- The poster image
  link_url text, -- Optional link to property or page
  display_order numeric default 0, -- For sorting
  is_active boolean default true
);

-- Enable RLS
alter table public.stories enable row level security;

-- Policies
create policy "Allow public read access"
  on public.stories for select
  to public
  using (true);

create policy "Allow authenticated insert"
  on public.stories for insert
  to authenticated
  with check (true);

create policy "Allow authenticated update"
  on public.stories for update
  to authenticated
  using (true);

create policy "Allow authenticated delete"
  on public.stories for delete
  to authenticated
  using (true);

-- Storage bucket for stories (reuse property-images or create new?)
-- Let's reuse 'property-images' for simplicity as it is already configured.
-- Or better, create a folder structure or just use it.
