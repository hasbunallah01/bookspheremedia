import "server-only";
import { prisma } from "@/lib/db";
export const getAffiliates = async () => !process.env.DATABASE_URL ? [] : prisma.affiliate.findMany({ where: { visible: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
