import { Injectable } from '@danet/core';
import { OnAppBootstrap, OnAppClose } from '@danet/core/hook';
import { Collection, Database, MongoClient, Document } from '@db/mongo';


@Injectable()
export class MongodbService implements OnAppBootstrap, OnAppClose {
  constructor() {}

  private client = new MongoClient();
  private db!: Database;
  getCollection<T extends Document>(collectionName: string): Collection<T> {
    return this.db.collection(collectionName);
  }

  async onAppBootstrap() {
    
    // const connectionString = `mongodb://${Deno.env.get('DB_HOST')}:${Deno.env.get('DB_PORT')}/${Deno.env.get('DB_NAME')}`;
    // const connectionString = 'mongodb://localhost:27017/311_Call_Details';
    // const connectionString = 'mongodb://172.105.5.242:27017/311_Call_Details';
    const connectionString =`mongodb+srv://${Deno.env.get('DB_USERNAME')}:${Deno.env.get('DB_PASSWORD')}@cluster0.3j9gq4j.mongodb.net/311_Call_Details?authMechanism=SCRAM-SHA-1`;
    this.db = await this.client.connect(connectionString);
    // console.log("🚀 ~ MongodbService ~ onAppBootstrap ~ connectionString:", connectionString)
    
  }

  async onAppClose() {
    await this.client.close();
  }
}
