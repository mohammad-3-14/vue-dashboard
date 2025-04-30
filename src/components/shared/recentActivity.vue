<script setup lang="ts">
import type { PropType } from 'vue';
import type { Activity } from '@/types/components';

const props = defineProps({
  recentActivities: {
    type: Array as PropType<Activity[]>,
    required: true,
  },
});
</script>

<template>
  <div class="lg:col-span-2 bg-core-950 rounded-xl p-6 shadow-2xl">
    <h3 class="font-semibold mb-6">{{ $t('activities.recentActivity') }}</h3>
    <div class="space-y-4">
      <div
        v-for="(activity, index) in recentActivities"
        :key="index"
        class="flex items-start"
      >
        <div class="bg-core-900 p-2 rounded-lg me-4">
          <component :is="activity.icon" class="text-primary size-6 stroke-2" />
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <p class="font-medium text-text">{{ activity.title }}</p>
            <span class="text-xs text-sub-text">{{ activity.time }}</span>
          </div>
          <p class="text-xs text-sub-text mt-1">
            {{ activity.description }}
          </p>
        </div>
      </div>
    </div>
    <button class="mt-6 text-primary text-sm font-medium flex items-center">
      {{ $t('activities.viewAllActivity') }}
    </button>
  </div>
</template>
