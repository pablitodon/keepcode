<template>
    <section class="filter">
        <button class="filter__button" :class="{ 'filter__button--active': props.filter === 'all' }"
            @click="handleFilterChange(FILTERS.ALL)">
            Все
        </button>
        <button class="filter__button" :class="{ 'filter__button--active': props.filter === 'active' }"
            @click="handleFilterChange(FILTERS.ACTIVE)">
            Активные
        </button>
        <button class="filter__button" :class="{ 'filter__button--active': props.filter === 'completed' }"
            @click="handleFilterChange(FILTERS.COMPLETED)">
            Завершённые
        </button>
    </section>
</template>

<script lang="ts" setup>
import { FILTERS } from '../constants/constants';
import type { Filters } from '../types/types';



const props = defineProps<{
    filter: string;
}>();

const emit = defineEmits<{
    (e: 'update:filter', value: Filters): void;
}>();

const handleFilterChange = (value: Filters) => {
    emit('update:filter', value);
};
</script>

<style lang="scss" scoped>
.filter {

    margin-bottom: 20px;

    &__button {
        margin-left: 5px;
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        background-color: #f0f0f0;
        color: #333;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
            background-color: #e0e0e0;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        &--active {
            background: linear-gradient(135deg, #0f6b4d, #a29bfe);
            color: white;
            box-shadow: 0 4px 8px rgba(108, 92, 231, 0.3);
        }
    }
}


@media (max-width: 480px) {
    .filter {
        align-items: center;
        flex-direction: column;

        &__button {
            width: 100%;
            margin-bottom: 10px;
        }
    }
}
</style>