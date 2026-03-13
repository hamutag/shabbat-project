import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import prisma from "@/lib/db";

export const shabbatRouter = router({
  log: protectedProcedure
    .input(z.object({ date: z.string(), kept: z.boolean(), notes: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const userId = (ctx.session.user as { id: string }).id;
      const shabbatDate = new Date(input.date);
      return prisma.shabbatTracking.upsert({
        where: { userId_shabbatDate: { userId, shabbatDate } },
        update: { kept: input.kept, notes: input.notes },
        create: { userId, shabbatDate, kept: input.kept, notes: input.notes },
      });
    }),

  history: protectedProcedure
    .input(z.object({ limit: z.number().default(52) }))
    .query(async ({ ctx, input }) => {
      const userId = (ctx.session.user as { id: string }).id;
      return prisma.shabbatTracking.findMany({
        where: { userId },
        orderBy: { shabbatDate: "desc" },
        take: input.limit,
      });
    }),

  streak: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    const records = await prisma.shabbatTracking.findMany({
      where: { userId },
      orderBy: { shabbatDate: "desc" },
    });
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    const totalKept = records.filter((r) => r.kept).length;
    for (const record of records) {
      if (record.kept) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      } else {
        if (currentStreak === 0) currentStreak = tempStreak;
        tempStreak = 0;
      }
    }
    if (currentStreak === 0) currentStreak = tempStreak;
    return { currentStreak, maxStreak, totalKept, totalRecords: records.length, keepRate: records.length > 0 ? Math.round((totalKept / records.length) * 100) : 0 };
  }),
});
