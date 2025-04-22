<script lang="ts" setup>
import { ref } from 'vue';
const emit = defineEmits(['toggleSidebar']);
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  BellIcon,
} from '@heroicons/vue/24/outline';

const toggleSidebar = () => {
  emit('toggleSidebar');
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const isSidebarCollapsed = ref<boolean>(true);
</script>

<template>
  <div class="sticky top-0 pt-3 bg-teal-900">
    <header
      class="bg-teal-950 border-b border-gray-700 p-4 rounded-xl flex items-center justify-between"
    >
      <div class="flex items-center justify-between gap-12">
        <button
          @click="toggleSidebar"
          class="mx-auto p-2 bg-teal-800 hover:bg-teal-700 rounded-lg flex items-center justify-center text-green-400 transition-all w-10 h-10"
        >
          <ArrowsPointingOutIcon class="w-5 h-5" v-if="isSidebarCollapsed" />
          <ArrowsPointingInIcon class="w-5 h-5" v-else />
        </button>
        <h2 class="text-xl font-semibold">Dashboard Overview</h2>
      </div>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <button>
            <BellIcon class="size-5" />
            <span
              class="absolute -top-3 start-2 bg-red-500 rounded-full text-xs w-4 h-4 flex items-center justify-center"
              >5</span
            >
          </button>
        </div>
        <div class="w-px h-6 bg-gray-700"></div>
        <div class="flex items-center">
          <span class="text-sm mr-2">Dark Mode</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" />
            <div
              class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"
            ></div>
          </label>
        </div>
      </div>
    </header>
  </div>
</template>
