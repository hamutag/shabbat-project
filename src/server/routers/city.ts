import { router, publicProcedure } from "../trpc";
import prisma from "@/lib/db";

export const cityRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.city.findMany({
      include: { region: { select: { id: true, name: true } } },
      orderBy: { name: "asc" },
    });
  }),

  regions: publicProcedure.query(async () => {
    return prisma.region.findMany({
      include: {
        cities: {
          select: { id: true, name: true },
          orderBy: { name: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });
  }),
});
