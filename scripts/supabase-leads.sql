create table if not exists public.leads (
  id text primary key,
  nome text not null,
  email text not null,
  whatsapp text not null,
  tema text not null,
  pergunta text not null,
  tipo text not null,
  signo text,
  numero_vida integer,
  created_at timestamptz not null default now()
);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.leads(id) on delete cascade,
  pergunta text not null,
  tema text not null,
  numero integer not null,
  cartas text not null,
  resposta text not null,
  tipo text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  valor text not null,
  tipo text not null,
  status text not null,
  payment_id text not null unique,
  email text not null default '',
  nome text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists consultations_created_at_idx on public.consultations (created_at desc);
create index if not exists consultations_user_id_idx on public.consultations (user_id);
create index if not exists payments_created_at_idx on public.payments (created_at desc);
create index if not exists payments_user_id_idx on public.payments (user_id);
create index if not exists payments_status_idx on public.payments (status);
