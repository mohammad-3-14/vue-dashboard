<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/layouts/header.vue';
import Sidebar from '@/components/layouts/sidebar.vue';

const toggleSidebar = (): void => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const isSidebarCollapsed = ref<boolean>(true);
</script>

<template>
  <div class="min-h-screen bg-teal-900 w-full">
    <div class="text-gray-200 container mx-auto px-5">
      <Header @toggleSidebar="toggleSidebar" />
      <div class="flex gap-5 mt-5">
        <!-- Sidebar Fixed -->
        <Sidebar :isSidebarCollapsed="isSidebarCollapsed" />
        <!-- Main Content -->
        <div class="w-full">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
