import { z } from "zod";

export const consultationSchema = z.object({
  nome: z.string().trim().min(2).max(80),
  email: z.union([z.string().trim().email().max(120), z.literal("")]).optional().default(""),
  whatsapp: z.union([z.string().trim().min(8).max(30), z.literal("")]).optional().default(""),
  dataNascimento: z.string().trim().min(8).max(10),
  pergunta: z.string().trim().min(8).max(900),
  tema: z.enum(["Amor", "Trabalho", "Dinheiro", "Família", "Saúde emocional", "Espiritual"]),
  numero: z.coerce.number().int().min(1).max(9),
  tipo: z.literal("FREE").default("FREE"),
  preferenciaContato: z.enum(["WhatsApp", "Email"]).default("WhatsApp"),
  consentimento: z.literal(true),
});

export type ConsultationPayload = z.infer<typeof consultationSchema>;
