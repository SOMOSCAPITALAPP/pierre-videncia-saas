"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Loader2,
  MessageCircle,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

type AdminRow = Record<string, string>;

type AdminData = {
  users: AdminRow[];
  consultas: AdminRow[];
  pagamentos: AdminRow[];
  leadSource?: string;
  paymentSource?: string;
  crm?: {
    leads: Array<{ id: string; firstName: string; whatsapp: string; theme: string; score: number; temperature: string }>;
    payments: Array<{ status: string }>;
    sessions: Array<{ id: string; firstName: string; status: string; offerId: string; lastMessageAt: string }>;
    tasks: Array<{ id: string; leadId: string; message: string; type: string; status: string }>;
  } | null;
};

type AdminSection = "users" | "consultas" | "pagamentos";
type StatusFilter = "todos" | "pagos" | "pendentes" | "sem_pagamento";

const sections: AdminSection[] = ["users", "consultas", "pagamentos"];
const sectionLabels: Record<AdminSection, string> = {
  users: "Leads",
  consultas: "Consultas",
  pagamentos: "Pagamentos",
};

const pipeline = ["Novo lead", "Consulta gratis enviada", "Interesse em oferta", "Pix pendente", "Pago", "Leitura entregue", "Recontatar"];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getValue(row: AdminRow, keys: string[]) {
  const foundKey = keys.find((key) => row[key] || row[key.toLowerCase()] || row[key.toUpperCase()]);
  return foundKey ? row[foundKey] || row[foundKey.toLowerCase()] || row[foundKey.toUpperCase()] || "" : "";
}

function getWhatsappHref(row: AdminRow) {
  const raw = getValue(row, ["whatsapp", "WhatsApp"]);
  const digits = raw.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const number = digits.startsWith("55") ? digits : `55${digits}`;
  const nome = getValue(row, ["nome", "name"]) || "querido consulente";

  return `https://wa.me/${number}?text=${encodeURIComponent(
    `Olá ${nome}, aqui é a equipe da Clareza Tarô. Vimos sua leitura e podemos orientar você a escolher a consulta mais adequada dentro do app.`,
  )}`;
}

function getLeadId(row: AdminRow) {
  return getValue(row, ["id", "user_id", "lead_id"]);
}

function getPaymentUserId(row: AdminRow) {
  return getValue(row, ["user_id", "id", "external_reference"]);
}

function getLeadName(row: AdminRow) {
  return getValue(row, ["nome", "name"]) || "Consulente";
}

function getLeadStatus(row: AdminRow) {
  return getValue(row, ["status", "plano", "tipo"]) || "novo_lead";
}

function getDateValue(row: AdminRow) {
  return getValue(row, ["created_at", "date_created", "date_approved", "data"]);
}

function formatDate(value: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d,.]/g, "").replace(",", ".");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function isPaid(row: AdminRow) {
  const status = normalize(getValue(row, ["status"]));
  return status.includes("approved") || status.includes("confirmado") || status.includes("pago");
}

function isPendingPayment(row: AdminRow) {
  const status = normalize(getValue(row, ["status"]));
  return status.includes("pending") || status.includes("pendente") || status.includes("in_process");
}

function rowMatchesQuery(row: AdminRow, query: string) {
  if (!query.trim()) return true;

  const haystack = normalize(Object.values(row).join(" "));
  return haystack.includes(normalize(query.trim()));
}

function getVisibleColumns(section: AdminSection, rows: AdminRow[]) {
  const preferred: Record<AdminSection, string[]> = {
    users: ["nome", "email", "whatsapp", "tema", "pergunta", "tipo", "status", "created_at"],
    consultas: ["user_id", "tema", "pergunta", "tipo", "created_at"],
    pagamentos: ["user_id", "valor", "tipo", "status", "payment_id", "created_at"],
  };

  const available = new Set(rows.flatMap((row) => Object.keys(row)));
  const selected = preferred[section].filter((column) => available.has(column));

  if (selected.length) return selected;

  return Array.from(available).slice(0, 8);
}

function getAttentionRows(data: AdminData) {
  const paidIds = new Set(data.pagamentos.filter(isPaid).map(getPaymentUserId).filter(Boolean));
  const pendingIds = new Set(data.pagamentos.filter(isPendingPayment).map(getPaymentUserId).filter(Boolean));

  return data.users
    .filter((lead) => {
      const id = getLeadId(lead);
      return !id || pendingIds.has(id) || !paidIds.has(id);
    })
    .slice(0, 8);
}

function buildRecentActivity(data: AdminData) {
  return [
    ...data.users.map((row) => ({ type: "Lead", title: getLeadName(row), detail: getValue(row, ["tema", "tipo"]), date: getDateValue(row) })),
    ...data.consultas.map((row) => ({
      type: "Consulta",
      title: getValue(row, ["tema", "tipo"]) || "Consulta gratuita",
      detail: getValue(row, ["pergunta"]),
      date: getDateValue(row),
    })),
    ...data.pagamentos.map((row) => ({
      type: isPaid(row) ? "Pagamento aprovado" : "Pagamento",
      title: getValue(row, ["tipo"]) || "Pix",
      detail: `${getValue(row, ["valor"])} ${getValue(row, ["status"])}`.trim(),
      date: getDateValue(row),
    })),
  ]
    .sort((first, second) => new Date(second.date || 0).getTime() - new Date(first.date || 0).getTime())
    .slice(0, 10);
}

function DashboardCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof Users;
}) {
  return (
    <div className="mystic-border rounded-[8px] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-ui text-sm text-[#fff7df]/60">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#d9aa4f]">{value}</p>
        </div>
        <span className="rounded-[8px] border border-[#d9aa4f]/25 p-2 text-[#d9aa4f]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/66">{hint}</p>
    </div>
  );
}

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("users");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");

  const stats = useMemo(() => {
    if (!data) return null;

    const paidPayments = data.pagamentos.filter(isPaid);
    const pendingPayments = data.pagamentos.filter(isPendingPayment);
    const revenue = paidPayments.reduce((sum, payment) => sum + parseMoney(getValue(payment, ["valor"])), 0);
    const conversion = data.users.length ? Math.round((paidPayments.length / data.users.length) * 100) : 0;

    return { paidPayments, pendingPayments, revenue, conversion };
  }, [data]);

  const attentionRows = useMemo(() => (data ? getAttentionRows(data) : []), [data]);
  const recentActivity = useMemo(() => (data ? buildRecentActivity(data) : []), [data]);

  const filteredRows = useMemo(() => {
    if (!data) return [];

    const rows = data[activeSection].filter((row) => rowMatchesQuery(row, query));
    if (statusFilter === "todos") return rows;
    if (statusFilter === "pagos") return rows.filter(isPaid);
    if (statusFilter === "pendentes") return rows.filter(isPendingPayment);

    const paidIds = new Set(data.pagamentos.filter(isPaid).map(getPaymentUserId).filter(Boolean));
    return rows.filter((row) => !paidIds.has(getLeadId(row)));
  }, [activeSection, data, query, statusFilter]);

  const visibleColumns = useMemo(() => getVisibleColumns(activeSection, filteredRows), [activeSection, filteredRows]);

  async function loadData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Acesso recusado.");
      }

      setData(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Erro ao carregar painel.");
    } finally {
      setLoading(false);
    }
  }

  async function exportCsv(sheet: AdminSection) {
    const response = await fetch("/api/admin/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, sheet }),
    });

    if (!response.ok) {
      setError("Nao foi possivel exportar este CSV.");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sheet}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">admin</p>
          <h1 className="mt-3 text-4xl font-semibold">Painel de atividade</h1>
          <p className="font-ui mt-3 max-w-2xl text-sm leading-6 text-[#fff7df]/68">
            Acompanhe leads, consultas gratuitas, Pix pendentes e pagamentos aprovados em um unico lugar.
          </p>
        </div>
        {data ? (
          <div className="font-ui rounded-[8px] border border-[#d9aa4f]/25 px-4 py-3 text-sm text-[#fff7df]/72">
            Leads: <span className="font-semibold text-[#d9aa4f]">{data.leadSource === "firestore" ? "Firestore" : data.leadSource === "supabase" ? "Supabase Free" : "Google Sheets"}</span>
            <span className="mx-2 text-[#fff7df]/35">/</span>
            Pagamentos:{" "}
            <span className="font-semibold text-[#d9aa4f]">
              {data.paymentSource === "firestore" ? "Firestore" : data.paymentSource === "supabase" ? "Supabase" : data.paymentSource === "mercado_pago" ? "Mercado Pago" : "Google Sheets"}
            </span>
          </div>
        ) : null}
      </div>

      <form onSubmit={loadData} className="mystic-border font-ui mt-8 flex flex-col gap-3 rounded-[8px] p-5 md:flex-row">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha admin"
          className="min-h-12 flex-1 rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 outline-none focus:border-[#d9aa4f]"
        />
        <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
          Entrar
        </button>
      </form>

      {error ? <p className="font-ui mt-4 rounded-[8px] border border-red-400/40 bg-red-950/30 p-3 text-sm text-red-100">{error}</p> : null}

      {data && stats ? (
        <div className="mt-8 grid gap-8">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <DashboardCard label="Leads" value={String(data.users.length)} hint="Pessoas que iniciaram uma consulta gratuita." icon={Users} />
            <DashboardCard label="Consultas" value={String(data.consultas.length)} hint="Tiragens gratuitas geradas no funil." icon={Sparkles} />
            <DashboardCard label="Pix aprovados" value={String(stats.paidPayments.length)} hint={`${stats.pendingPayments.length} Pix ainda pendente.`} icon={CheckCircle2} />
            <DashboardCard label="Receita confirmada" value={formatMoney(stats.revenue)} hint={`${stats.conversion}% de conversao sobre os leads.`} icon={TrendingUp} />
          </div>

          {data.crm ? (
            <div className="grid gap-4 xl:grid-cols-2">
              <article className="mystic-border rounded-[8px] p-5">
                <h2 className="text-2xl font-semibold">Prospects quentes</h2>
                <p className="font-ui mt-2 text-sm text-[#fff7df]/64">Prioridade calculada pelas ações no aplicativo.</p>
                <div className="mt-4 grid gap-3">
                  {data.crm.leads.filter((lead) => lead.temperature === "hot" || lead.temperature === "very_hot").slice(0, 8).map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between gap-3 rounded-[8px] border border-[#d9aa4f]/20 p-3">
                      <div><p className="font-semibold">{lead.firstName} · {lead.theme}</p><p className="font-ui text-xs text-[#fff7df]/60">Score {lead.score}/100</p></div>
                      {lead.whatsapp ? <a className="rounded-full bg-[#d9aa4f] px-4 py-2 text-xs font-bold text-[#160b12]" href={getWhatsappHref({ nome: lead.firstName, whatsapp: lead.whatsapp })} target="_blank" rel="noreferrer">WhatsApp</a> : null}
                    </div>
                  ))}
                </div>
              </article>
              <article className="mystic-border rounded-[8px] p-5">
                <h2 className="text-2xl font-semibold">Próximas ações</h2>
                <p className="font-ui mt-2 text-sm text-[#fff7df]/64">{data.crm.sessions.filter((session) => session.status === "active").length} sessões em andamento · {data.crm.sessions.filter((session) => session.status === "completed").length} concluídas · {data.crm.payments.filter((payment) => payment.status === "abandoned").length} Pix pendentes há mais de uma hora</p>
                <div className="mt-4 grid gap-3">
                  {data.crm.tasks.filter((task) => task.status === "pending").slice(0, 8).map((task) => {
                    const lead = data.crm?.leads.find((item) => item.id === task.leadId);
                    return <div key={task.id} className="rounded-[8px] border border-[#d9aa4f]/20 p-3"><p className="text-sm">{task.message}</p>{lead?.whatsapp ? <a className="font-ui mt-2 inline-block text-sm text-[#d9aa4f] underline" href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "").replace(/^(?!55)/, "55")}?text=${encodeURIComponent(task.message)}`} target="_blank" rel="noreferrer">Abrir WhatsApp</a> : null}</div>;
                  })}
                </div>
              </article>
            </div>
          ) : null}

          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <article className="mystic-border rounded-[8px] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Fila de atencao</h2>
                  <p className="font-ui mt-2 text-sm leading-6 text-[#fff7df]/64">Leads recentes sem pagamento aprovado ou com Pix pendente.</p>
                </div>
                <AlertCircle className="h-6 w-6 text-[#d9aa4f]" />
              </div>
              <div className="mt-5 grid gap-3">
                {attentionRows.map((row, index) => (
                  <div key={`${getLeadId(row)}-${index}`} className="rounded-[8px] border border-[#d9aa4f]/16 bg-[#120817]/60 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-semibold text-[#fff7df]">{getLeadName(row)}</p>
                        <p className="font-ui mt-1 text-sm text-[#fff7df]/64">{getValue(row, ["tema", "tipo"]) || "Consulta gratuita"}</p>
                        <p className="font-ui mt-2 line-clamp-2 text-sm leading-6 text-[#fff7df]/72">{getValue(row, ["pergunta"])}</p>
                      </div>
                      {getWhatsappHref(row) ? (
                        <a
                          href={getWhatsappHref(row)}
                          className="font-ui inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-4 text-sm font-bold text-[#160b12]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
                {!attentionRows.length ? <p className="font-ui text-sm text-[#fff7df]/60">Nenhum lead pendente no momento.</p> : null}
              </div>
            </article>

            <article className="mystic-border rounded-[8px] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Atividade recente</h2>
                  <p className="font-ui mt-2 text-sm leading-6 text-[#fff7df]/64">Ultimos movimentos do funil.</p>
                </div>
                <WalletCards className="h-6 w-6 text-[#d9aa4f]" />
              </div>
              <div className="mt-5 grid gap-3">
                {recentActivity.map((item, index) => (
                  <div key={`${item.type}-${item.date}-${index}`} className="grid grid-cols-[auto_1fr] gap-3 rounded-[8px] border border-[#d9aa4f]/14 p-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#d9aa4f]" />
                    <div>
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <p className="font-ui text-sm font-semibold text-[#d9aa4f]">{item.type}</p>
                        <p className="font-ui text-xs text-[#fff7df]/48">{formatDate(item.date)}</p>
                      </div>
                      <p className="mt-1 font-semibold">{item.title}</p>
                      <p className="font-ui mt-1 line-clamp-2 text-sm leading-6 text-[#fff7df]/64">{item.detail}</p>
                    </div>
                  </div>
                ))}
                {!recentActivity.length ? <p className="font-ui text-sm text-[#fff7df]/60">A atividade aparecera aqui quando houver registros.</p> : null}
              </div>
            </article>
          </div>

          <article className="mystic-border rounded-[8px] p-5">
            <h2 className="text-2xl font-semibold">Pipeline</h2>
            <div className="font-ui mt-4 flex flex-wrap gap-2">
              {pipeline.map((item) => (
                <span key={item} className="rounded-full border border-[#d9aa4f]/30 px-3 py-2 text-xs text-[#fff7df]/72">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="mystic-border overflow-hidden rounded-[8px]">
            <div className="border-b border-[#d9aa4f]/20 p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <button
                      key={section}
                      type="button"
                      onClick={() => setActiveSection(section)}
                      className={`font-ui rounded-full border px-4 py-2 text-sm ${
                        activeSection === section
                          ? "border-[#d9aa4f] bg-[#d9aa4f] font-bold text-[#160b12]"
                          : "border-[#d9aa4f]/30 text-[#fff7df]/72"
                      }`}
                    >
                      {sectionLabels[section]} ({data[section].length})
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => exportCsv(activeSection)}
                  className="font-ui inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#d9aa4f]/40 px-4 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Exportar CSV
                </button>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
                <label className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#fff7df]/45" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar por nome, email, tema, status ou pagamento"
                    className="font-ui min-h-11 w-full rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] pl-11 pr-4 text-sm outline-none focus:border-[#d9aa4f]"
                  />
                </label>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                  className="font-ui min-h-11 rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 text-sm outline-none focus:border-[#d9aa4f]"
                >
                  <option value="todos">Todos os status</option>
                  <option value="pagos">Pagos</option>
                  <option value="pendentes">Pix pendente</option>
                  <option value="sem_pagamento">Sem pagamento aprovado</option>
                </select>
              </div>
            </div>

            <div className="font-ui overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-[#120817] text-[#d9aa4f]">
                  <tr>
                    {visibleColumns.map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">
                        {column}
                      </th>
                    ))}
                    {activeSection === "users" ? <th className="px-4 py-3 font-semibold">acao</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row, index) => (
                    <tr key={`${activeSection}-${index}`} className="border-t border-[#d9aa4f]/10">
                      {visibleColumns.map((column) => (
                        <td key={column} className="max-w-sm px-4 py-3 align-top text-[#fff7df]/72">
                          {column.includes("created_at") || column.includes("date") ? formatDate(row[column]) : row[column]}
                        </td>
                      ))}
                      {activeSection === "users" ? (
                        <td className="px-4 py-3 align-top">
                          <div className="flex flex-col gap-2">
                            <span className="rounded-full border border-[#d9aa4f]/30 px-3 py-1 text-xs text-[#d9aa4f]">{getLeadStatus(row)}</span>
                            {getWhatsappHref(row) ? (
                              <a
                                href={getWhatsappHref(row)}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-3 py-2 text-xs font-bold text-[#160b12]"
                              >
                                <MessageCircle className="h-4 w-4" />
                                WhatsApp
                              </a>
                            ) : null}
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                  {!filteredRows.length ? (
                    <tr>
                      <td className="px-4 py-6 text-[#fff7df]/60" colSpan={visibleColumns.length + (activeSection === "users" ? 1 : 0)}>
                        Nenhum registro encontrado para este filtro.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
