import type { ITodo } from "../types/types";

export const getTasks = async (limit: number = 10): Promise<ITodo[]> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    const data:ITodo[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
