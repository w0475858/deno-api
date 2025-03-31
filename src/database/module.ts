import { Module, TokenInjector } from '@danet/core';
import { MongodbService } from "./mongodb.service.ts";

export const DATABASE = '311_Call_Details';

@Module({
  imports: [],
  injectables: [new TokenInjector(MongodbService, DATABASE)], // change PostgresService by any service using other database engine if needed.
})
export class DatabaseModule {}
