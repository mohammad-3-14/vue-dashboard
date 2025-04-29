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
  <div class="bg-teal-950 rounded-xl p-6 border border-gray-700">
    <h3 class="font-semibold mb-6">{{ $t('products.topProducts') }}</h3>
    <div class="space-y-4">
      <div
        v-for="(product, index) in topProducts"
        :key="index"
        class="flex items-center"
      >
        <div
          class="w-10 h-10 rounded-lg bg-teal-800 bg-opacity-10 flex items-center justify-center me-4"
        >
          <component
            :is="product.icon"
            class="text-green-400 stroke-2 size-6"
          />
        </div>
        <div class="flex-1">
          <h4 class="font-medium">{{ product.name }}</h4>
          <p class="text-xs text-gray-400">{{ product.category }}</p>
        </div>
        <div class="text-green-400 font-medium">
          {{ product.price }}
        </div>
      </div>
    </div>
    <button class="mt-6 text-green-400 text-sm font-medium flex items-center">
    {{ $t('products.viewAllProducts') }}
      
    </button>
  </div>
</template>
