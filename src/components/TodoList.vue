<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" class="item">
      <div v-if="todo.id !== editingTodoId" class="item__content">
        <span class="item__text" :class="{ 'item__text--completed': todo.completed }">
          {{ todo.title }}
        </span>
        <div class="item__actions">
          <button class="item__button item__button--edit" @click="startEdit(todo.id)">
            Изменить
          </button>
          <button class="item__button item__button--complete" @click="$emit('complete:title', todo.id)">
            {{ todo.completed ? 'Не готов' : 'Готов' }}
          </button>
          <button class="item__button item__button--delete" @click="$emit('delete:title', todo.id)">
            Удалить
          </button>
        </div>
      </div>

      <div v-else class="item__edit">
        <input type="text" :value="editingText" @input="handleEditText" @blur="saveEdit(todo.id)"
          @keyup.enter="saveEdit(todo.id)" class="item__input" placeholder="Изменить задачу" />
        <button class="item__button item__button--save" @click="saveEdit(todo.id)">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ITodo } from '../types/types';

const props = defineProps<{
  todos: ITodo[];
}>();

const emit = defineEmits<{
  (e: 'update:title', id: number, newTitle: string): void;
  (e: 'delete:title', id: number): void;
  (e: 'complete:title', id: number): void;
}>();

const editingTodoId = ref<number | null>(null);
const editingText = ref<string>('');

const handleEditText = (event: Event) => {
  const target = event.target as HTMLInputElement;
  editingText.value = target.value;
};

const startEdit = (id: number) => {
  const todo = props.todos.find((t) => t.id === id);
  if (todo) {
    editingTodoId.value = id;
    editingText.value = todo.title;
  }
};

const saveEdit = (id: number) => {
  if (editingText.value.trim()) {
    emit('update:title', id, editingText.value);
  }
  editingTodoId.value = null;
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

.item__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  gap: 10px;
  width: 100%;
}

.item__text {
  flex-grow: 1;
  font-size: 16px;
  color: #333;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  &--completed {
    text-decoration: line-through;
    color: #888;
  }
}

.item__actions {
  display: flex;
  gap: 8px;
}

.item__edit {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.item__input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #615e5e;
  }
}

.item__button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  min-width: 80px;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }

  &--complete {
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
    }
  }

  &--delete {
    background-color: #ff4d4d;
    color: white;

    &:hover {
      background-color: #ff6666;
    }
  }

  &--save {
    background-color: #751554;
    color: white;

    &:hover {
      background-color: #4e0b35;
    }
  }
}

@media (max-width: 480px) {
  .item {
    gap: 10px;
    align-items: center;
  }

  .item__content {
    flex-direction: column;
    align-items: flex-start;
  }

  .item__text {
    max-width: 100%;
  }

  .item__actions {
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
  }

  .item__edit {
    flex-direction: column;
    gap: 8px;
  }

  .item__input {
    width: 100%;
  }

  .item__button {
    width: 100%;
    padding: 10px;
  }
}
</style>