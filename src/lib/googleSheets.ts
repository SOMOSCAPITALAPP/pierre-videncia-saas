import { google } from "googleapis";

type SheetRow = Array<string | number>;

const headers = {
  users: ["id", "nome", "email", "whatsapp", "data_nascimento", "signo", "numero_vida", "plano", "created_at"],
  consultas: ["user_id", "pergunta", "tema", "numero", "cartas", "resposta", "tipo", "created_at"],
  pagamentos: ["user_id", "valor", "tipo", "status"],
} as const;

let sheetsClient: ReturnType<typeof google.sheets> | null = null;

function getSheetsClient() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !email || !privateKey) {
    return null;
  }

  if (!sheetsClient) {
    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    sheetsClient = google.sheets({ version: "v4", auth });
  }

  return sheetsClient;
}

export function getSpreadsheetId() {
  return process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "";
}

export async function appendSheetRow(sheetName: keyof typeof headers, row: SheetRow) {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  if (!sheets || !spreadsheetId) {
    console.info(`[sheets disabled] ${sheetName}`, row);
    return;
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
  } catch (error) {
    console.error(`[sheets append failed] ${sheetName}`, error);
  }
}

export async function getSheetRows(sheetName: keyof typeof headers) {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  if (!sheets || !spreadsheetId) {
    return [];
  }

  let response;

  try {
    response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
    });
  } catch (error) {
    console.error(`[sheets read failed] ${sheetName}`, error);
    return [];
  }

  const [head, ...rows] = response.data.values || [];
  const keys = head?.length ? head : headers[sheetName];

  return rows.map((row) =>
    keys.reduce<Record<string, string>>((record, key, index) => {
      record[String(key)] = String(row[index] || "");
      return record;
    }, {}),
  );
}

export async function getAllAdminData() {
  const [users, consultas, pagamentos] = await Promise.all([
    getSheetRows("users"),
    getSheetRows("consultas"),
    getSheetRows("pagamentos"),
  ]);

  return { users, consultas, pagamentos };
}

export function rowsToCsv(rows: Record<string, string>[]) {
  if (!rows.length) {
    return "";
  }

  const columns = Object.keys(rows[0]);
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;

  return [columns.join(","), ...rows.map((row) => columns.map((column) => escape(row[column] || "")).join(","))].join("\n");
}
