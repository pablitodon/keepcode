
import { ref, computed, onMounted } from 'vue';
import type { Filters, ITodo } from '../types/types';
import { getTasks } from '../api/api';

export function useTodos() {
  const filter = ref<Filters>('all');
  const todos = ref<ITodo[]>([]);

  const saveToLocalStorage = (todos: ITodo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const loadFromLocalStorage = (): ITodo[] | null => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : null;
  };

  const handleUpdate = (id: number, newTitle: string) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.title = newTitle;
      saveToLocalStorage(todos.value);
    }
  };

  const handleAddTodo = (title: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      title,
      completed: false,
      userId: todos.value.length + 1,
    };
    todos.value.unshift(newTodo);
    saveToLocalStorage(todos.value);
  };

  const handleDelete = (id: number) => {
    const newTodo = todos.value.filter((todo: ITodo) => todo.id !== id);
    todos.value = newTodo;
    saveToLocalStorage(newTodo);
  };

  const handleComplete = (id: number) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveToLocalStorage(todos.value);
    }
  };

  const activeTodos = computed(() => todos.value.filter(todo => !todo.completed));
  const completedTodos = computed(() => todos.value.filter(todo => todo.completed));

  const getTodos = async () => {
    try {
      const localTodos = loadFromLocalStorage();
      if (localTodos) {
        todos.value = localTodos;
      } else {
        const resp = await getTasks(10);
        todos.value = resp;
        saveToLocalStorage(resp);
      }
    } catch (error) {
      throw new Error(`Error fetching todos:${error}`);
    }
  };

  onMounted(() => {
    getTodos();
  });

  return {
    filter,
    todos,
    activeTodos,
    completedTodos,
    handleUpdate,
    handleAddTodo,
    handleDelete,
    handleComplete,
  };
}