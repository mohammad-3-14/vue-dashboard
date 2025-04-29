<script lang="ts" setup>
import { ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import Button from '@/components/shared/button.vue';
import Tooltip from '@/components/shared/tooltip.vue';

import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  BellIcon,
  SunIcon,
  Squares2X2Icon,
} from '@heroicons/vue/24/outline';

const emit = defineEmits(['toggleSidebar', 'toggleDrawer']);

const toggleSidebar = (): void => {
  emit('toggleSidebar');
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleDrawer = (): void => {
  emit('toggleDrawer');
};

const isSidebarCollapsed = ref<boolean>(true);

const { setLanguage, language } = useLanguage();

// تعداد نوتیفیکیشن به صورت داینامیک
const notificationsCount = ref<number>(5);

const toggleLanguage = () => {
  setLanguage(language.value === 'fa' ? 'en' : 'fa');
};
</script>

<template>
  <div class="sticky top-0 pt-3 bg-teal-900">
    <header
      class="bg-teal-950 border-b border-gray-700 p-4 rounded-xl flex items-center justify-between"
    >
      <div class="flex items-center justify-between gap-12">
        <Tooltip :text="$t('header.toggleSidebar')" position="bottom">
          <Button @click="toggleSidebar" class="hidden md:block">
            <ArrowsPointingOutIcon class="w-5 h-5" v-if="isSidebarCollapsed" />
            <ArrowsPointingInIcon class="w-5 h-5" v-else />
          </Button>

          <Button @click="toggleDrawer" class="md:hidden">
            <Squares2X2Icon class="w-5 h-5" />
          </Button>
        </Tooltip>

        <h2 class="text-xl font-semibold">{{ $t('header.dashboard') }}</h2>
      </div>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <Tooltip :text="$t('header.notifications')" position="bottom">
            <button>
              <BellIcon class="size-5" />
              <span
                class="absolute -top-3 start-2 bg-red-500 rounded-full text-xs w-4 h-4 flex items-center justify-center"
              >
                {{ notificationsCount }}
              </span>
            </button>
          </Tooltip>
        </div>

        <div class="relative">
          <Tooltip :text="$t('header.language')" position="bottom">
            <Button @click="toggleLanguage">
              <svg
                v-if="language === 'fa'"
                class="size-5"
                viewBox="0 0 640 480"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- پرچم ایران -->
                <rect width="640" height="160" fill="#239f40" />
                <rect y="160" width="640" height="160" fill="#fff" />
                <rect y="320" width="640" height="160" fill="#da0000" />
                <g fill="#da0000" transform="translate(320 240) scale(1.8)">
                  <g id="emblem">
                    <path
                      d="M-5-15c-1.4 0-3.3 2.1-3.3 4.8 0 1.9.7 2.6 1.7 2.6 1.2 0 2.2-1.2 2.2-2.8 0-1.4-.5-2.5-1.5-2.5-.5 0-.7.3-.7.8 0 .3.1.7.3 1.1.1.3.1.5.1.5-.1.1-.2.2-.4.2-.5 0-.8-.7-.8-1.7 0-1.2.7-2.1 1.6-2.1.9 0 1.7.7 1.7 2.2 0 1.7-1.2 3.2-2.8 3.2-1.4 0-2.3-1-2.3-2.8 0-2.2 1.4-4.5 3.4-4.5.4 0 .7.1 1 .2l.3-1.1c-.5-.1-.9-.2-1.2-.2z"
                    />
                    <use transform="scale(-1,1)" href="#emblem" />
                    <use transform="scale(-1,-1)" href="#emblem" />
                    <use transform="scale(1,-1)" href="#emblem" />
                  </g>
                </g>
              </svg>

              <svg
                v-else
                class="size-5"
                viewBox="0 0 640 480"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- پرچم بریتانیا -->
                <rect width="640" height="480" fill="#012169" />
                <path
                  d="M0 0l640 480m-640 0l640-480"
                  stroke="#fff"
                  stroke-width="60"
                />
                <path
                  d="M0 0l640 480m-640 0l640-480"
                  stroke="#c8102e"
                  stroke-width="40"
                />
                <path
                  d="M320 0v480m-320-240h640"
                  stroke="#fff"
                  stroke-width="100"
                />
                <path
                  d="M320 0v480m-320-240h640"
                  stroke="#c8102e"
                  stroke-width="60"
                />
              </svg>
            </Button>
          </Tooltip>
        </div>

        <Tooltip :text="$t('header.darkmode')" position="bottom">
          <Button>
            <SunIcon class="size-5 text-green-400" />
          </Button>
        </Tooltip>
      </div>
    </header>
  </div>
</template>
