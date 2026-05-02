"use client";

import { useState } from "react";
import { Download, Loader2, MessageCircle } from "lucide-react";

type AdminData = {
  users: Record<string, string>[];
  consultas: Record<string, string>[];
  pagamentos: Record<string, string>[];
  leadSource?: string;
};

type AdminSection = "users" | "consultas" | "pagamentos";

const sections: AdminSection[] = ["users", "consultas", "pagamentos"];
const pipeline = ["Novo lead", "Consulta grátis enviada", "Interesse em oferta", "Pix pendente", "Pago", "Leitura entregue", "Recontatar"];

function getWhatsappHref(row: Record<string, string>) {
  const raw = row.whatsapp || row.WhatsApp || "";
  const digits = raw.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const number = digits.startsWith("55") ? digits : `55${digits}`;
  const nome = row.nome || "querido consulente";

  return `https://wa.me/${number}?text=${encodeURIComponent(`Olá ${nome}, aqui é Pierre Videncia. Vi sua consulta e posso te orientar no próximo passo da leitura.`)}`;
}

function getLeadStatus(row: Record<string, string>) {
  return row.status || row.plano || "novo_lead";
}

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Não foi possível exportar este CSV.");
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
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">admin</p>
      <h1 className="mt-3 text-4xl font-semibold">Painel Pierre Videncia</h1>
      <form onSubmit={loadData} className="mystic-border font-ui mt-8 flex flex-col gap-3 rounded-[8px] p-5 md:flex-row">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha admin"
          className="min-h-12 flex-1 rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 outline-none focus:border-[#d9aa4f]"
        />
        <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Entrar
        </button>
      </form>
      {error ? <p className="font-ui mt-4 rounded-[8px] border border-red-400/40 bg-red-950/30 p-3 text-sm text-red-100">{error}</p> : null}

      {data ? (
        <div className="mt-8 grid gap-8">
          <div className="mystic-border rounded-[8px] p-4">
            <p className="font-ui text-sm text-[#fff7df]/60">Fonte da lista de inscritos</p>
            <p className="mt-2 text-lg font-semibold text-[#d9aa4f]">
              {data.leadSource === "supabase" ? "Supabase Free" : "Google Sheets ou armazenamento não configurado"}
            </p>
            {!data.users.length ? (
              <p className="font-ui mt-2 text-sm leading-6 text-[#fff7df]/66">
                Nenhum inscrito encontrado. Para usar sem Google, configure Supabase Free com as variáveis SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.
              </p>
            ) : null}
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="mystic-border rounded-[8px] p-4">
              <p className="font-ui text-sm text-[#fff7df]/60">Leads</p>
              <p className="mt-2 text-3xl font-bold text-[#d9aa4f]">{data.users.length}</p>
            </div>
            <div className="mystic-border rounded-[8px] p-4">
              <p className="font-ui text-sm text-[#fff7df]/60">Consultas</p>
              <p className="mt-2 text-3xl font-bold text-[#d9aa4f]">{data.consultas.length}</p>
            </div>
            <div className="mystic-border rounded-[8px] p-4">
              <p className="font-ui text-sm text-[#fff7df]/60">Pagamentos</p>
              <p className="mt-2 text-3xl font-bold text-[#d9aa4f]">{data.pagamentos.length}</p>
            </div>
            <div className="mystic-border rounded-[8px] p-4">
              <p className="font-ui text-sm text-[#fff7df]/60">Ação principal</p>
              <p className="mt-2 text-sm leading-6 text-[#fff7df]/78">Priorize WhatsApp para leads recentes e Pix pendente.</p>
            </div>
          </div>

          <article className="mystic-border rounded-[8px] p-5">
            <h2 className="text-2xl font-semibold">Pipeline recomendado</h2>
            <div className="font-ui mt-4 flex flex-wrap gap-2">
              {pipeline.map((item) => (
                <span key={item} className="rounded-full border border-[#d9aa4f]/30 px-3 py-2 text-xs text-[#fff7df]/72">
                  {item}
                </span>
              ))}
            </div>
          </article>

          {sections.map((section) => (
            <article key={section} className="mystic-border overflow-hidden rounded-[8px]">
              <div className="flex items-center justify-between gap-3 border-b border-[#d9aa4f]/20 p-4">
                <h2 className="text-2xl font-semibold capitalize">{section}</h2>
                <button
                  type="button"
                  onClick={() => exportCsv(section)}
                  className="font-ui inline-flex items-center gap-2 rounded-full border border-[#d9aa4f]/40 px-4 py-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  export CSV
                </button>
              </div>
              <div className="font-ui overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-[#120817] text-[#d9aa4f]">
                    <tr>
                      {Object.keys(data[section][0] || {}).map((column) => (
                        <th key={column} className="px-4 py-3 font-semibold">
                          {column}
                        </th>
                      ))}
                      {section === "users" ? <th className="px-4 py-3 font-semibold">ação</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {data[section].map((row, index) => (
                      <tr key={index} className="border-t border-[#d9aa4f]/10">
                        {Object.values(row).map((value, valueIndex) => (
                          <td key={valueIndex} className="max-w-xs px-4 py-3 align-top text-[#fff7df]/72">
                            {value}
                          </td>
                        ))}
                        {section === "users" ? (
                          <td className="px-4 py-3 align-top">
                            <div className="flex flex-col gap-2">
                              <span className="rounded-full border border-[#d9aa4f]/30 px-3 py-1 text-xs text-[#d9aa4f]">
                                {getLeadStatus(row)}
                              </span>
                              {getWhatsappHref(row) ? (
                                <a
                                  href={getWhatsappHref(row)}
                                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-3 py-2 text-xs font-bold text-[#160b12]"
                                >
                                  <MessageCircle className="h-4 w-4" />
                                  Abrir WhatsApp
                                </a>
                              ) : null}
                            </div>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                    {!data[section].length ? (
                      <tr>
                        <td className="px-4 py-6 text-[#fff7df]/60">Nenhum registro encontrado.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
