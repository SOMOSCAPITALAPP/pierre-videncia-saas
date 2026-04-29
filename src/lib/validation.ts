import { z } from "zod";

export const consultationSchema = z.object({
  nome: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  whatsapp: z.string().trim().min(8).max(30),
  dataNascimento: z.string().trim().min(8).max(10),
  pergunta: z.string().trim().min(8).max(900),
  tema: z.enum(["Amor", "Trabalho", "Dinheiro", "Família", "Espiritual"]),
  numero: z.coerce.number().int().min(1).max(9),
  tipo: z.enum(["FREE", "BASIC", "PREMIUM"]).default("FREE"),
  preferenciaContato: z.enum(["WhatsApp", "Email"]).default("WhatsApp"),
});

export type ConsultationPayload = z.infer<typeof consultationSchema>;
