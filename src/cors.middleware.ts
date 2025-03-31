
export const corsMiddleware = async (ctx: any, next: () => Promise<unknown>) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    if (ctx.request.method === "OPTIONS") {
      ctx.response.status = 204;
      return;
    }
  
    await next();
  };