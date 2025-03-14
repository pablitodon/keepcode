<template>
  <div class="add-todo">
    <input type="text" v-model="title" placeholder="Добавь новую задачу" @keyup.enter="handleSubmit"
      class="add-todo_input" />
    <button @click="handleSubmit" type="button" class="add-todo_button">Add</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const title = ref('');
const emit = defineEmits(['add-todo']);

const handleSubmit = () => {
  if (title.value.trim()) {
    emit('add-todo', title.value.trim());
    title.value = '';
  }
};
</script>

<style lang="scss" scoped>
.add-todo {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  margin-bottom: 1.2rem;

  &_input {
    flex-grow: 1;
    padding: 0.8rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      border-color: #615e5e;
    }

    &:focus {
      border-color: #615e5e;
      box-shadow: 0 0 0 2px rgba(97, 94, 94, 0.2);
    }
  }

  &_button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #615e5e;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #757474;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

@media (max-width: 480px) {
  .add-todo {
    flex-direction: column;
    gap: 8px;

    &_input {
      width: 100%;
      padding: 12px;
    }

    &_button {
      width: 100%;
      padding: 12px;
    }
  }
}
</style>