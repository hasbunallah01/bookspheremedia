import "server-only";
import { prisma } from "@/lib/db";
import { genres } from "@/data/genres";
export const genreNames = genres.map((g) => g.name);
export const authorOptions = async () => (await prisma.author.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }));
export const p = <T,>(s: string | null | undefined): T | undefined => { try { return s ? JSON.parse(s) : undefined; } catch { return undefined; } };
