<template>
  <form class="add" @submit.prevent="handleSubmit">
    <input type="text" v-model="title" placeholder="Добавь новую задачу" class="add__input" />
    <button type="submit" class="add__button">Добавить</button>
  </form>
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
.add {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  margin-bottom: 1.2rem;

  &__input {
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

  &__button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #00cec9; // Бирюзовый цвет
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #00b4b1;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

@media (max-width: 480px) {
  .add {
    flex-direction: column;
    gap: 8px;

    &__input {
      width: 100%;
      padding: 12px;
    }

    &__button {
      width: 100%;
      padding: 12px;
    }
  }
}
</style>