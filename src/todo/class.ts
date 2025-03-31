import { IsString, LengthGreater } from '@danet/core/validation';
import type { ObjectId } from '@db/mongo';

export class CallData {
  readonly _id: `${string}-${string}-${string}-${string}-${string}` | ObjectId  = crypto.randomUUID();
  
  @IsString()
  public QUEUE_NAME: string;

  @IsString()
  public OUTCOME: string;

  @IsString()
  public CALL_ID: string;
  
  constructor(QUEUE_NAME: string, OUTCOME:string, CALL_ID:string) {
    this.QUEUE_NAME = QUEUE_NAME;
    this.OUTCOME = OUTCOME;
    this.CALL_ID = CALL_ID;
  }
}
