import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import prisma from "@/lib/db";

export const trackRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.track.findMany({
      where: { isActive: true },
      include: { _count: { select: { steps: true } } },
      orderBy: { sortOrder: "asc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => prisma.track.findUnique({
      where: { id: input.id },
      include: { steps: { orderBy: { stepNumber: "asc" } } },
    })),

  start: protectedProcedure
    .input(z.object({ trackId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = (ctx.session.user as { id: string }).id;
      return prisma.userTrack.create({
        data: { userId, trackId: input.trackId, currentStep: 1, status: "active" },
      });
    }),

  advanceStep: protectedProcedure
    .input(z.object({ userTrackId: z.string() }))
    .mutation(async ({ input }) => {
      const ut = await prisma.userTrack.findUnique({
        where: { id: input.userTrackId },
        include: { track: true },
      });
      if (!ut) throw new Error("מסלול לא נמצא");
      const isComplete = ut.currentStep >= ut.track.stepsCount;
      return prisma.userTrack.update({
        where: { id: input.userTrackId },
        data: {
          currentStep: isComplete ? ut.currentStep : { increment: 1 },
          completedAt: isComplete ? new Date() : null,
          status: isComplete ? "completed" : "active",
        },
      });
    }),

  myTracks: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session.user as { id: string }).id;
    return prisma.userTrack.findMany({
      where: { userId },
      include: { track: { include: { steps: { orderBy: { stepNumber: "asc" } } } } },
      orderBy: { startedAt: "desc" },
    });
  }),
});
