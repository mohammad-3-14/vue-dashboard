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
  <div class="lg:col-span-2 bg-teal-950 rounded-xl p-6 border border-gray-700">
    <h3 class="font-semibold mb-6">{{ $t('activities.recentActivity') }}</h3>
    <div class="space-y-4">
      <div
        v-for="(activity, index) in recentActivities"
        :key="index"
        class="flex items-start"
      >
        <div class="bg-teal-800 bg-opacity-10 p-2 rounded-lg me-4">
          <component
            :is="activity.icon"
            class="text-green-400 size-6 stroke-2"
          />
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <h4 class="font-medium">{{ activity.title }}</h4>
            <span class="text-xs text-gray-400">{{ activity.time }}</span>
          </div>
          <p class="text-sm text-gray-400">
            {{ activity.description }}
          </p>
        </div>
      </div>
    </div>
    <button class="mt-6 text-green-400 text-sm font-medium flex items-center">
      {{ $t('activities.viewAllActivity') }}
    </button>
  </div>
</template>
