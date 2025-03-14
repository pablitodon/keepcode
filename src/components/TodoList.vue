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

<template>
  <div>
    <div v-for="todo in todos" :key="todo.id" class="item">
      <div v-if="todo.id !== editingTodoId" class="item_content" @dblclick="startEdit(todo.id)">
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <div class="item_actions">
          <button class="btn complete_btn" @click="$emit('complete:title', todo.id)">
            {{ todo.completed ? 'Не готов' : 'Готов' }}
          </button>
          <button class="btn delete_btn" @click="$emit('delete:title', todo.id)">Удалить</button>
        </div>
      </div>

      <div v-else class="item_edit">
        <input type="text" :value="editingText" @input="handleEditText" @blur="saveEdit(todo.id)"
          @keyup.enter="saveEdit(todo.id)" class="edit_input" placeholder="Edit task" />
        <button class="btn save_btn" @click="saveEdit(todo.id)">Сохранить</button>
      </div>
    </div>
  </div>
</template>

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

.item_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  gap: 10px;

  span {
    flex-grow: 1;
    font-size: 16px;
    color: #333;

    &.completed {
      text-decoration: line-through;
      color: #888;
    }
  }
}

.item_actions {
  display: flex;
  gap: 8px;
}

.item_edit {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  .edit_input {
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
}

.btn {
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
}

.complete_btn {
  background-color: #615e5e;
  color: white;

  &:hover {
    background-color: #757474;
  }
}

.delete_btn {
  background-color: #ff4d4d;
  color: white;

  &:hover {
    background-color: #ff6666;
  }
}

.save_btn {
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
}


@media (max-width: 480px) {
  .item {
    gap: 10px;
    align-items: center;
  }

  .item_actions {
    flex-direction: column;
  }

  .item_edit {
    flex-direction: column;
    gap: 8px;
  }

  .edit_input {
    width: 100%;
  }

  .btn {
    width: 100%;
    padding: 10px;
  }
}
</style>