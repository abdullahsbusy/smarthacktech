-- TechWallet schema. Run this once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  category      text not null,
  brand         text not null default 'Generic',
  price         integer not null check (price >= 0),
  compare_price integer,
  stock         integer not null default 0 check (stock >= 0),
  tag           text,
  short         text not null default '',
  specs         jsonb not null default '[]'::jsonb,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create sequence if not exists order_seq start 1001;

create table if not exists orders (
  id             uuid primary key default gen_random_uuid(),
  number         text unique not null,
  customer_name  text not null,
  phone          text not null,
  email          text,
  city           text not null,
  address        text not null,
  note           text,
  payment_method text not null default 'cod',
  payment_status text not null default 'unpaid',
  status         text not null default 'pending',
  tracking_no    text,
  courier        text,
  subtotal       integer not null,
  shipping       integer not null,
  total          integer not null,
  created_at     timestamptz not null default now()
);

create table if not exists order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  name       text not null,
  price      integer not null,
  qty        integer not null check (qty > 0)
);

create table if not exists fyp_requests (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  university text,
  package    text,
  idea       text,
  status     text not null default 'new',
  notes      text,
  created_at timestamptz not null default now()
);

-- Row Level Security: the public (anon key) can only read active products.
-- Orders and requests are written/read only by the server with the service role key.
alter table products     enable row level security;
alter table orders       enable row level security;
alter table order_items  enable row level security;
alter table fyp_requests enable row level security;

-- Link orders to customer accounts (Supabase Auth). Guests leave this empty.
alter table orders add column if not exists user_id uuid references auth.users(id) on delete set null;
create index if not exists orders_user_id_idx on orders(user_id);

drop policy if exists "public read active products" on products;
create policy "public read active products" on products
  for select using (is_active = true);

-- Atomic order placement: locks product rows, checks stock, uses DB prices.
create or replace function place_order(p_customer jsonb, p_items jsonb, p_shipping integer)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_number   text;
  v_subtotal integer := 0;
  it         jsonb;
  prod       products%rowtype;
  v_qty      integer;
begin
  if jsonb_array_length(p_items) = 0 then
    raise exception 'EMPTY_CART';
  end if;

  v_number := 'TW-' || nextval('order_seq')::text;

  insert into orders (number, customer_name, phone, email, city, address, note,
                      payment_method, subtotal, shipping, total)
  values (v_number, p_customer->>'name', p_customer->>'phone', p_customer->>'email',
          p_customer->>'city', p_customer->>'address', p_customer->>'note',
          coalesce(p_customer->>'payment_method', 'cod'), 0, p_shipping, 0)
  returning id into v_order_id;

  for it in select * from jsonb_array_elements(p_items) loop
    v_qty := (it->>'qty')::integer;

    select * into prod from products
      where slug = it->>'slug' and is_active = true
      for update;

    if not found then
      raise exception 'NOT_FOUND:%', it->>'slug';
    end if;
    if prod.stock < v_qty then
      raise exception 'OUT_OF_STOCK:%', prod.name;
    end if;

    update products set stock = stock - v_qty where id = prod.id;
    insert into order_items (order_id, product_id, name, price, qty)
      values (v_order_id, prod.id, prod.name, prod.price, v_qty);
    v_subtotal := v_subtotal + prod.price * v_qty;
  end loop;

  update orders set subtotal = v_subtotal, total = v_subtotal + p_shipping
    where id = v_order_id;

  return v_number;
end;
$$;

revoke all on function place_order(jsonb, jsonb, integer) from public, anon, authenticated;
grant execute on function place_order(jsonb, jsonb, integer) to service_role;
