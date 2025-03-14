
export interface ITodo {
    userId: number;
    title: string;
    completed: boolean;
    id:number
  };

export type Filters = 'all' | 'active' | 'completed';