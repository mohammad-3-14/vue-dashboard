<script setup lang="ts">
import type { PropType } from 'vue';
import type { Product } from '@/types/components';

const props = defineProps({
  topProducts: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});
</script>

<template>
  <div class="bg-core-950 rounded-xl p-6 shadow-2xl">
    <h3 class="font-semibold mb-6">{{ $t('products.topProducts') }}</h3>
    <div class="space-y-4">
      <div
        v-for="(product, index) in topProducts"
        :key="index"
        class="flex items-center"
      >
        <div
          class="w-10 h-10 rounded-lg bg-core-900 flex items-center justify-center me-4"
        >
          <component :is="product.icon" class="text-primary stroke-2 size-6" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-text">{{ product.name }}</p>
          <p class="text-xs text-sub-text mt-1">{{ product.category }}</p>
        </div>
        <div class="text-primary font-medium">
          {{ product.price }}
        </div>
      </div>
    </div>
    <button class="mt-6 text-primary text-sm font-medium flex items-center">
      {{ $t('products.viewAllProducts') }}
    </button>
  </div>
</template>
