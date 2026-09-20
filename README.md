# Pierre Videncia

Aplicação Next.js em português do Brasil: leitura grátis, ofertas, Pix Mercado Pago, consulta premium no aplicativo e painel administrativo.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Copie `.env.example` para `.env.local`. A chave do OpenAI e o token do Mercado Pago ficam somente no servidor.

## Firestore

1. Crie um projeto Firebase no plano Spark e ative o Cloud Firestore.
2. Crie uma conta de serviço com acesso ao Firestore. Configure `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY` no ambiente do servidor Vercel. Na chave privada, preserve as quebras de linha como `\n`.
3. Configure `PREMIUM_SESSION_SECRET` com uma chave aleatória longa e `CRON_SECRET` para proteger a rotina diária.
4. Mantenha as regras de acesso do Firestore fechadas para clientes. Apenas as API routes usam o SDK Admin.

As coleções `leads`, `payments`, `sessions`, `events` e `agent_tasks` são criadas automaticamente no primeiro registro. Firestore guarda o funil, a memória da consulta e os limites restantes. Sem as credenciais Firebase, o aplicativo mantém os dados legados de Supabase/Google Sheets, mas não tem persistência de sessão e contadores no servidor.

## Fluxo comercial

- `/consulta` aceita apenas leitura grátis; `/resultado` leva a `/ofertas`.
- `/api/create-payment` escolhe o preço no servidor. O Pix é criado pelo Mercado Pago.
- `/api/payments/status` compara pagamento, valor, oferta e consulente antes de liberar o cookie premium.
- `/api/premium-reading` e `/api/chat` exigem esse cookie. Quando Firestore está ativo, gravam leituras, esclarecimentos e contadores.
- `/api/cron/daily` roda diariamente às 12:00 UTC e prepara tarefas para Pix pendentes, leads quentes e consultas encerradas. As mensagens de WhatsApp são abertas pelo administrador via `wa.me`; o cron não as envia automaticamente.
- `/admin` mostra o mini CRM quando Firestore está configurado. Supabase e Google Sheets continuam como fallback de leitura.

Resend permanece opcional para uma etapa futura. Não há envio automático de email sem domínio e consentimento configurados.

## Verificação

```bash
npx tsc --noEmit
npx eslint src
npm run build
```
