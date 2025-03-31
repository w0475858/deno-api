import '@std/dotenv/load';
import { AppModule } from './app.module.ts';
import { DanetApplication } from '@danet/core';
import { loggerMiddleware } from './logger.middleware.ts';
// import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
// import { Context } from 'https://deno.land/x/oak@v12.5.0/mod.ts'; // Import Context type
// import { Next } from 'https://deno.land/x/oak@v12.5.0/mod.ts';
import { corsMiddleware } from "./cors.middleware.ts";
// import { NestFactory } from "https://deno.land/x/danet/mod.ts";

export const bootstrap = async () => {

  const application = new DanetApplication();
  // application.use(corsMiddleware);

  await application.init(AppModule);

  // application.addGlobalMiddlewares(loggerMiddleware);
  return application;
};
