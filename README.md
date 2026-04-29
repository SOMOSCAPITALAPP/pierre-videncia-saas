# Pierre Videncia SaaS MVP

SaaS mobile-first em português do Brasil para captação de leads, consulta grátis de tarô, upsell por Pix e painel admin simples com Google Sheets.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- API routes Next.js
- OpenAI `gpt-4o-mini` por padrão
- Google Sheets como banco simples
- Pix manual com WhatsApp

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PIX_KEY=
WHATSAPP_NUMBER=5511999999999
ADMIN_PASSWORD=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_YOUTUBE_URL=
```

No Google Sheets, crie abas com estes nomes e cabeçalhos:

- `users`: `id`, `nome`, `email`, `whatsapp`, `data_nascimento`, `signo`, `numero_vida`, `plano`, `status`, `created_at`
- `consultas`: `user_id`, `pergunta`, `tema`, `numero`, `cartas`, `resposta`, `tipo`, `created_at`
- `pagamentos`: `user_id`, `valor`, `tipo`, `status`

Compartilhe a planilha com o email da service account.

## Publicar no GitHub e Vercel

```bash
git init
git add .
git commit -m "Initial Pierre Videncia SaaS MVP"

gh repo create pierre-videncia-saas --public --source=. --remote=origin --push

vercel
vercel --prod
```

Configure as variáveis de ambiente no Vercel antes do deploy de produção.
