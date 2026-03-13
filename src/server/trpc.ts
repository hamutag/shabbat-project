import { initTRPC, TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import superjson from "superjson";

// Context type for tRPC
export interface TRPCContext {
  session: Session | null;
}

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

// Middleware: require authenticated user
const enforceAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "יש להתחבר כדי לבצע פעולה זו" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceAuth);

// Middleware: require admin/coordinator role
const enforceAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "יש להתחבר" });
  }
  const role = (ctx.session.user as { role?: string }).role;
  const adminRoles = ["CITY_COORD_MALE", "CITY_COORD_FEMALE", "NEIGHBORHOOD_HEAD", "CITY_HEAD", "REGION_HEAD", "NATIONAL_ADMIN"];
  if (!role || !adminRoles.includes(role)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "אין לך הרשאות לביצוע פעולה זו" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const adminProcedure = t.procedure.use(enforceAdmin);
