import { Repository } from "../database/repository.ts";
import { CallData } from "./class.ts";
import { ObjectId } from "@db/mongo";
import { Inject } from "@danet/core";
import { DATABASE } from "../database/module.ts";
import { MongodbService } from "../database/mongodb.service.ts";

// Utility function for validation
function validateTodoData(todoData: Partial<CallData>): boolean {
  if (!todoData.CALL_ID || typeof todoData.CALL_ID !== 'string') {
    return false;
  }
  // Add more field checks and validations as needed
  return true;
}

export class MongodbRepository implements Repository<CallData> {
  constructor(@Inject(DATABASE) private dbService: MongodbService) {}

  async getAll(_limit: number, _skip: number): Promise<{ success: boolean; data: CallData[]; message?: string }> {
    try {
      const filter = {};
      const options = {
        limit: _limit,
         skip: _skip,
      };

      

      // const collection = this.dbService.getCollection("json_data");
      // const result = await collection.findOne(filter);
      // const todos = result as CallData[]; // Cast to CallData[]
      // console.log("🚀 ~ MongodbRepository ~ getAll ~ todos:", todos)
      // // const insertedId = result;


      console.log("🚀 ~ MongodbRepository ~ getAll ~ this.dbService:", this.dbService)
      const todos = await this.dbService.getCollection<CallData>("json_data").find(filter, options).toArray();
      // console.log("🚀 ~ MongodbRepository ~ getAll ~ options:", options)
      // console.log("🚀 ~ MongodbRepository ~ getAll ~ this.dbService:", this.dbService)
      // console.log("🚀 ~ MongodbRepository ~ getAll ~ todos:", todos)
      return { success: true, data: todos };
    } catch (error) {
      return { success: false, data: [], message: 'Failed to retrieve todos.' };
    }
  }

  async create(todo: Omit<CallData, "_id">): Promise<{ success: boolean; data?: CallData; message: string }> {
    if (!validateTodoData(todo)) {
      return { success: false, message: 'Validation failed for the todo data.' };
    }

    try {
      const collection = this.dbService.getCollection<Omit<CallData, "_id">>("json_data");
      const result = await collection.insertOne(todo);
      const insertedId = result;

      if (!insertedId) {
        throw new Error("Failed to retrieve inserted document ID.");
      }

      const insertedTodo: any = {
        _id: insertedId as ObjectId, // Adjust based on your system's inserted ID type
        ...todo,
      };

      return { success: true, data: insertedTodo, message: 'CallData created successfully.' };
    } catch (error) {
      return { success: false, message: 'Failed to create todo.' };
    }
  }

  async getById(id: string): Promise<{ success: boolean; data: CallData | null; message: string }> {
    try {
      const objectId = new ObjectId(id);
      const todo = await this.dbService.getCollection<CallData>("json_data").findOne({ _id: objectId });
  
      if (todo) {
        return { success: true, data: todo, message: 'CallData retrieved successfully.' };
      } else {
        return { success: false, data: null, message: 'CallData not found.' };
      }
    } catch (error) {
      return { success: false, data: null, message: 'Failed to retrieve todo.' };
    }
  }

  async updateOne(todoId: string, todo: Partial<CallData>): Promise<{ success: boolean; message: string }> {
    if (!validateTodoData(todo)) {
      return { success: false, message: 'Validation failed for the todo data.' };
    }

    try {
      const objectId = new ObjectId(todoId);
      const result = await this.dbService.getCollection<CallData>("json_data").updateOne({ _id: objectId }, { $set: todo });

      if (result.modifiedCount > 0) {
        return { success: true, message: 'CallData updated successfully.' };
      } else {
        return { success: false, message: 'No changes were made to the todo.' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to update todo.' };
    }
  }

  async deleteOne(todoId: string): Promise<{ success: boolean; message: string }> {
    try {
      const objectId = new ObjectId(todoId);
      const result = await this.dbService.getCollection<CallData>("json_data").deleteOne({ _id: objectId });
      console.log("result",result);
      if (isDeleteResultObject(result) && result.deletedCount > 0) {
        return { success: true, message: 'CallData deleted successfully.' };
      }

      return { success: false, message: 'CallData not found or already deleted.' };
    } catch (error) {
      return { success: false, message: 'Failed to delete todo.' };
    }
  }

  async deleteAll(): Promise<{ success: boolean; deletedCount: number; message: string }> {
    try {
      const result = await this.dbService.getCollection<CallData>("json_data").deleteMany({});
      return { success: true, deletedCount: isDeleteResultObject(result) ? result.deletedCount : result, message: 'All todos deleted successfully.' };
    } catch (error) {
      return { success: false, deletedCount: 0, message: 'Failed to delete todos.' };
    }
  }
}

// Type guard for MongoDB deletion results
function isDeleteResultObject(result: any): result is { deletedCount: number } {
  return typeof result === 'object' && result !== null && 'deletedCount' in result;
}