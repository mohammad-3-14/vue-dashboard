<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/layouts/header.vue';
import Sidebar from '@/components/layouts/sidebar.vue';

const toggleSidebar = (): void => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleDrawer = (): void => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
const isDrawerOpen = ref<boolean>(false);
const isSidebarCollapsed = ref<boolean>(true);
</script>

<template>
  <div class="min-h-screen bg-core-900 w-full">
    <div class="text-text container mx-auto px-5">
      <Header @toggleSidebar="toggleSidebar" @toggleDrawer="toggleDrawer" />
      <div class="flex md:gap-5 mt-7">
        <!-- Sidebar Fixed -->
        <Sidebar
          :isSidebarCollapsed="isSidebarCollapsed"
          :isDrawerOpen="isDrawerOpen"
        />
        <!-- Main Content -->
        <div class="w-full">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
