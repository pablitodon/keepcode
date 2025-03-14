<template>
  <main class="todo">
    <header class="todo__header">
      <h1 class="todo__title">Список задач</h1>
    </header>
    <TodoFilters :filter="filter" @update:filter="filter = $event" />
    <AddTodo class="todo__add-todo" @add-todo="handleAddTodo" />
    <section class="todo__list">
      <TodoList :todos="filteredTodos" @update:title="handleUpdate" @delete:title="handleDelete"
        @complete:title="handleComplete" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';
import TodoFilters from './components/TodoFilters.vue';
import { useTodos } from './composables/useTodos';

const { filter, todos, activeTodos, completedTodos, handleUpdate, handleAddTodo, handleDelete, handleComplete } =
  useTodos();

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return activeTodos.value;
    case 'completed':
      return completedTodos.value;
    default:
      return todos.value;
  }
});
</script>

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

  &__header {
    text-align: center;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 2rem;
    color: #333;
  }

  &__add-todo {
    margin-bottom: 20px;
  }

  &__list {
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .todo {
    padding: 15px;
    height: 100vh;

    &__title {
      font-size: 1.5rem;
    }
  }
}
</style>