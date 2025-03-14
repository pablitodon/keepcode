<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';
import type { ITodo } from './types/types';
import { getTasks } from './api/api';


const filter = ref<'all' | 'active' | 'completed'>('all');
const todos = ref<ITodo[]>([])

const saveToLocalStorage = (todos: ITodo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const loadFromLocalStorage = (): ITodo[] | null => {
  const storedTodos = localStorage.getItem('todos')
  return storedTodos ? JSON.parse(storedTodos) : null
}

const handleUpdate = (id: number, newTitle: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.title = newTitle
    saveToLocalStorage(todos.value)
  }
}


const handleAddTodo = (title: string) => {
  const newTodo: ITodo = {
    id: Date.now(),
    title,
    completed: false,
    userId: todos.value.length + 1
  };
  todos.value.push(newTodo);
  saveToLocalStorage(todos.value);
};

const handleDelete = (id: number) => {
  const newTodo = todos.value.filter((todo: ITodo) => todo.id !== id);
  todos.value = newTodo;
  saveToLocalStorage(newTodo);
}

const handleComplete = (id: number) => {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveToLocalStorage(todos.value);
  }
}

const activeTodos = computed(() => todos.value.filter(todo => !todo.completed));
const completedTodos = computed(() => todos.value.filter(todo => todo.completed));

const getTodos = async () => {
  try {
    const localTodos = loadFromLocalStorage()
    if (localTodos) {
      todos.value = localTodos
    } else {
      const resp = await getTasks(10)
      todos.value = resp
      saveToLocalStorage(resp)
    }
  } catch (error) {
    throw new Error(`Error fetching todos:${error}`)
  }
}

onMounted(() => {
  getTodos()
})
</script>


<template>
  <div class="todo">
    <h1 class="todo_head">TodoList</h1>
    <div class="todo_filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
      <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Completed</button>
    </div>
    <AddTodo @add-todo="handleAddTodo" />

    <TodoList v-if="filter === 'all'" :todos="todos" @update:title="handleUpdate" @delete:title="handleDelete"
      @complete:title="handleComplete" />
    <TodoList v-if="filter === 'active'" :todos="activeTodos" @update:title="handleUpdate" @delete:title="handleDelete"
      @complete:title="handleComplete" />
    <TodoList v-if="filter === 'completed'" :todos="completedTodos" @update:title="handleUpdate"
      @delete:title="handleDelete" @complete:title="handleComplete" />
  </div>
</template>
<style lang="scss" scoped>
.todo {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &_head {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }

  &_filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 20px;
      background-color: #f0f0f0;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #615e5e;
        color: white;
        transform: translateY(-2px);
      }

      &.active {
        background-color: #615e5e;
        color: white;
      }
    }
  }
}


@media (max-width: 480px) {
  .todo {
    padding: 15px;
    height: 100vh;

    &_head {
      font-size: 1.5rem;
    }

    &_filters {
      flex-direction: column;
      align-items: center;

      button {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>