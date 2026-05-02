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

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
