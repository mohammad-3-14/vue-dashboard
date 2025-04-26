<script setup lang="ts">
import type { StatItem } from '@/types/components';
const props = defineProps<StatItem>();
</script>

<template>
  <div class="bg-teal-950 rounded-xl p-6 card-hover border border-gray-700">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-gray-400 text-sm">{{ label }}</p>
        <h3 class="text-2xl font-bold mt-1">{{ value }}</h3>
        <p class="text-sm mt-2 flex items-center">
          <i class="fas"></i> {{ changePercentage }}%
          {{ $t('common.fromLastMonth') }}
        </p>
      </div>
      <div class="bg-teal-800 bg-opacity-10 p-2 rounded-lg">
        <component :is="icon" class="text-green-400 size-6 stroke-2" />
      </div>
    </div>
  </div>
</template>
