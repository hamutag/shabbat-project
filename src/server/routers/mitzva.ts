import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import prisma from "@/lib/db";

export const mitzvaRouter = router({
  // Get all mitzvot
  list: publicProcedure.query(async () => {
    return prisma.mitzva.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  }),

  // Get user's mitzvot
  myMitzvot: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    return prisma.userMitzva.findMany({
      where: { userId },
      include: { mitzva: true },
    });
  }),

  // Add mitzva to user
  addToUser: protectedProcedure
    .input(z.object({ mitzvaId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = (ctx.session.user as { id: string }).id;
      return prisma.userMitzva.create({
        data: {
          userId,
          mitzvaId: input.mitzvaId,
          status: "started",
          progressLevel: 0,
        },
      });
    }),

  // Update mitzva progress
  updateProgress: protectedProcedure
    .input(z.object({
      userMitzvaId: z.string(),
      progressLevel: z.number().min(0).max(100),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return prisma.userMitzva.update({
        where: { id: input.userMitzvaId },
        data: {
          progressLevel: input.progressLevel,
          lastProgress: new Date(),
          notes: input.notes,
          status: input.progressLevel >= 100 ? "completed" : "active",
        },
      });
    }),

  // Remove mitzva from user
  removeFromUser: protectedProcedure
    .input(z.object({ userMitzvaId: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.userMitzva.delete({
        where: { id: input.userMitzvaId },
      });
    }),
});
