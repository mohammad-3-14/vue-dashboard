<script setup lang="ts">
import DefaultLayout from '@/layouts/default.vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

onMounted(() => {
  if (locale.value === 'fa') {
    document.documentElement.lang = 'fa';
  }
});
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<style scoped></style>
