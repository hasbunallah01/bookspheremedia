import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Neon Postgres via the serverless driver (WebSocket on 443) — works on Vercel and locally.
neonConfig.webSocketConstructor = ws;

const g = globalThis as unknown as { prisma?: PrismaClient };
export const prisma =
  g.prisma ?? new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }) });
if (process.env.NODE_ENV !== "production") g.prisma = prisma;
