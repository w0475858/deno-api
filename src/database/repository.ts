export interface Repository<T> {
  getAll(_limit: number, _skip: number): Promise<{ success: boolean; data: T[]; message?: string }>;
  getById(id: string): Promise<{ success: boolean; data: T | null; message: string }>;
  create(dto: Omit<T, '_id'>): Promise<{ success: boolean; data?: T; message: string }>;
  updateOne(id: string, dto: Partial<T>): Promise<{ success: boolean; message: string }>;
  deleteOne(id: string): Promise<{ success: boolean; message: string }>;
  deleteAll(): Promise<{ success: boolean; deletedCount: number; message: string }>;
}