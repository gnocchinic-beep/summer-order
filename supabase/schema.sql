-- =========================================================
-- CARICO & SCARICO — schema Supabase
-- Esegui questo file una sola volta in Supabase > SQL Editor
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------- CATALOGO / MAGAZZINO ----------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Vodka','Rum','Gin','Tequila','Champagne','Bibite','Birre','Altro')),
  format text not null,
  min_quantity numeric not null default 0,
  current_quantity numeric not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- ORDINI ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  responsabile_name text not null,
  order_date date not null default current_date,
  status text not null default 'bozza' check (status in ('bozza','inviato','confermato')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  confirmed_at timestamptz
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  product_name text not null,
  category text not null,
  format text not null,
  giacenza_reale numeric not null default 0,
  scarico numeric not null default 0,
  ordine numeric not null default 0,
  carico numeric
);

create index if not exists idx_order_items_order on order_items(order_id);

-- ---------- RLS ----------
-- Solo utenti autenticati (tu + responsabile magazzino) possono leggere/scrivere.
-- L'app parla con Supabase direttamente dal browser con la ANON KEY: è per
-- questo che le policy sono fondamentali, sono l'unica protezione dei dati.

alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "authenticated full access products"
  on products for all
  to authenticated
  using (true) with check (true);

create policy "authenticated full access orders"
  on orders for all
  to authenticated
  using (true) with check (true);

create policy "authenticated full access order_items"
  on order_items for all
  to authenticated
  using (true) with check (true);
