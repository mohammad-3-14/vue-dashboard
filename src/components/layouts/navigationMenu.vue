<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
import {
  Squares2X2Icon,
  ChartBarIcon,
  ChartPieIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline';

// Define a more specific type for the icon components from Heroicons
type IconComponent = typeof Squares2X2Icon;

// Define the NavItem interface for sidebar navigation items
interface NavItem {
  icon: IconComponent;
  text: string;
  active: boolean;
}

// Define props
const props = defineProps<{ isCollapsed: boolean }>();

// Define emits
const emit = defineEmits<{ (e: 'closeDrawer'): void }>();

// Array of navigation items with explicit typing
const navItems: NavItem[] = [
  { icon: Squares2X2Icon, text: 'sidebar.dashboard', active: true },
  { icon: ChartBarIcon, text: 'sidebar.analytics', active: false },
  { icon: ChartPieIcon, text: 'sidebar.finance', active: false },
  { icon: BuildingStorefrontIcon, text: 'sidebar.customers', active: false },
  { icon: Cog6ToothIcon, text: 'sidebar.settings', active: false },
];
</script>

<template>
  <div v-if="isCollapsed" class="flex-1 overflow-y-auto pt-4 overflow-x-hidden">
    <nav class="px-4 space-y-1">
      <a
        v-for="(item, index) in navItems"
        :key="`collapsed-${index}`"
        href="#"
        :class="[
          'hover:bg-core-800 flex items-center justify-center py-3 rounded-lg h-12 transition-all duration-300 px-2',
          item.active
            ? 'text-primary bg-core-900'
            : 'text-text hover:text-primary',
        ]"
        @click="emit('closeDrawer')"
      >
        <component :is="item.icon" class="w-6 h-6 min-w-6" />
      </a>
    </nav>
  </div>
  <div v-else class="flex-1 overflow-y-auto pt-4 overflow-x-hidden">
    <nav class="px-4 space-y-1">
      <a
        v-for="(item, index) in navItems"
        :key="`expanded-${index}`"
        href="#"
        :class="[
          'hover:bg-core-900 flex items-center py-3 rounded-lg h-12 transition-all duration-300 px-4',
          item.active
            ? 'text-primary bg-core-900'
            : 'text-text hover:text-primary',
        ]"
        @click="emit('closeDrawer')"
      >
        <component :is="item.icon" class="w-6 h-6 min-w-6 me-3" />
        <span class="transition-opacity duration-300">{{ $t(item.text) }}</span>
      </a>
    </nav>
  </div>
</template>
