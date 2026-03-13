import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers/_app";
import { auth } from "@/lib/auth";
import type { TRPCContext } from "@/server/trpc";

const createContext = async (): Promise<TRPCContext> => {
  const session = await auth();
  return { session };
};

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
