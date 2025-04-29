<script lang="ts" setup>
import {
  ref,
  computed,
  defineProps,
  watchEffect,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import {
  RocketLaunchIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline';
import NavigationMenu from './navigationMenu.vue';

const props = defineProps<{
  isSidebarCollapsed: boolean;
  isDrawerOpen: boolean;
}>();

const isDrawerOpen = ref<boolean>(false);
const isRTL = ref<boolean>(false);

// Function to check if the document direction is RTL
const checkRTLDirection = (): boolean => {
  // First check document and HTML element dir attributes
  if (
    document.dir === 'rtl' ||
    document.documentElement.getAttribute('dir') === 'rtl' ||
    document.body.getAttribute('dir') === 'rtl'
  ) {
    return true;
  }

  // Check if we have access to i18n instance
  // @ts-ignore - may not exist in all setups
  if (window.$i18n && typeof window.$i18n.locale === 'string') {
    // List of RTL languages
    const rtlLanguages = ['ar', 'fa', 'he', 'ur', 'ku', 'sd', 'ps', 'ug', 'yi'];
    // @ts-ignore - checking global i18n instance if available
    const currentLang = window.$i18n.locale.split('-')[0].toLowerCase();
    return rtlLanguages.includes(currentLang);
  }

  // Check HTML lang attribute as fallback
  const htmlLang = document.documentElement.getAttribute('lang');
  if (htmlLang) {
    const lang = htmlLang.split('-')[0].toLowerCase();
    const rtlLanguages = ['ar', 'fa', 'he', 'ur', 'ku', 'sd', 'ps', 'ug', 'yi'];
    return rtlLanguages.includes(lang);
  }

  return false;
};

// Utility to observe language/direction changes
const setupDirectionObserver = () => {
  // Define a function to update RTL status
  const updateRTLStatus = () => {
    isRTL.value = checkRTLDirection();
    // Emit an event that other components can listen to
    document.dispatchEvent(
      new CustomEvent('direction-changed', {
        detail: { isRTL: isRTL.value },
      })
    );
  };

  // Check initial direction
  updateRTLStatus();

  // Watch for language changes in various ways:

  // 1. Using MutationObserver to detect attribute changes on html or body
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        (mutation.attributeName === 'dir' || mutation.attributeName === 'lang')
      ) {
        updateRTLStatus();
        break;
      }
    }
  });

  // Observe both document element and body for dir/lang attribute changes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir', 'lang'],
  });
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['dir', 'lang'],
  });

  // 2. Listen for custom language change events (common in i18n libraries)
  const handleLanguageChange = () => {
    updateRTLStatus();
  };

  // Standard browser event
  window.addEventListener('languagechange', handleLanguageChange);

  // Common custom events from popular i18n libraries
  const languageEvents = [
    'languagechange', // Standard
    'app:languageChanged', // Custom app event
    'i18n:languageChanged', // Generic i18n event
    'i18n:locale-changed', // Vue i18n
    'localeChanged', // Another common pattern
    'language-changed', // Another common pattern
  ];

  // Add all event listeners
  languageEvents.forEach((eventName) => {
    document.addEventListener(eventName, handleLanguageChange);
  });

  // If Vue I18n is available, try to watch for locale changes
  // @ts-ignore - May not exist in all setups
  if (window.$i18n && window.$i18n.$watch) {
    // @ts-ignore - Try to use Vue I18n locale watcher
    const unwatchLocale = window.$i18n.$watch('locale', () => {
      updateRTLStatus();
    });
  }

  // Check periodically as a fallback (e.g., for programmatic changes)
  const intervalId = setInterval(updateRTLStatus, 2000);

  // Return cleanup function
  return () => {
    observer.disconnect();
    clearInterval(intervalId);

    // Remove all event listeners
    window.removeEventListener('languagechange', handleLanguageChange);
    languageEvents.forEach((eventName) => {
      document.removeEventListener(eventName, handleLanguageChange);
    });
  };
};

// Setup when component is mounted
onMounted(() => {
  const cleanup = setupDirectionObserver();

  // Clean up when component is unmounted
  onUnmounted(cleanup);
});

watchEffect(() => {
  isDrawerOpen.value = props.isDrawerOpen;
});

const closeDrawer = (): void => {
  isDrawerOpen.value = false;
};

const sidebarClasses = computed<string[]>(() => [
  'bg-teal-950 hidden shadow-lg md:flex sticky h-full top-24 flex-col max-h-[80dvh] min-h-96 rounded-xl transition-all duration-300',
  props.isSidebarCollapsed ? 'w-20' : 'w-64',
]);

const iconContainerClasses = computed<string[]>(() => [
  'hover:bg-black/20 flex items-center py-3 rounded-lg text-green-400 h-12 transition-all duration-300',
  props.isSidebarCollapsed ? 'justify-center px-2' : 'px-4',
]);

const titleClasses = computed<string[]>(() => [
  'transition-opacity duration-300',
  props.isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100',
]);

const profileDetailsClasses = computed<string[]>(() => [
  'transition-opacity duration-300',
  props.isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100',
  isRTL.value ? 'me-3' : 'ms-3',
]);

const settingsIconClasses = computed<string[]>(() => [
  'relative transition-opacity duration-300',
  props.isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100',
  isRTL.value ? 'me-auto' : 'ms-auto',
]);

const drawerPositionClasses = computed<string[]>(() => [
  'absolute inset-y-0 max-w-xs w-full bg-teal-950 shadow-xl',
  isRTL.value ? 'right-0' : 'left-0',
]);

const drawerTransformClass = computed<string>(() => {
  return isRTL.value ? 'rtl-drawer' : 'ltr-drawer';
});

const iconMarginClass = computed<string>(() => {
  if (props.isSidebarCollapsed) return '';
  return isRTL.value ? 'ms-3' : 'me-3';
});
</script>

<template>
  <div>
    <aside :class="sidebarClasses">
      <div class="pt-4 px-4 space-y-1 overflow-hidden">
        <div class="flex items-center justify-between">
          <div :class="iconContainerClasses">
            <RocketLaunchIcon
              class="w-6 h-6 min-w-6"
              :class="iconMarginClass"
            />
            <span :class="titleClasses">{{ $t('sidebar.title') }}</span>
          </div>
        </div>
      </div>
      <NavigationMenu
        :is-collapsed="props.isSidebarCollapsed"
        @close-drawer="closeDrawer"
      />
      <div class="p-4 border-t border-gray-700">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-green-400 flex-none"></div>
          <div :class="profileDetailsClasses">
            <p class="text-sm font-medium">{{ $t('sidebar.user_name') }}</p>
            <p class="text-xs text-gray-400">{{ $t('sidebar.user_role') }}</p>
          </div>
          <div :class="settingsIconClasses">
            <Cog6ToothIcon class="w-6 h-6 min-w-6" />
          </div>
        </div>
      </div>
    </aside>

    <Transition name="overlay">
      <div v-if="isDrawerOpen" class="fixed inset-0 z-50 overflow-hidden">
        <div class="absolute inset-0 bg-black/50" @click="closeDrawer"></div>
        <Transition
          :name="drawerTransformClass"
          appear
          @after-leave="$emit('drawer-closed')"
        >
          <div :class="drawerPositionClasses">
            <div
              class="flex items-center justify-between p-4 border-b border-gray-700"
            >
              <div class="flex items-center">
                <RocketLaunchIcon
                  class="w-6 h-6 text-green-400"
                  :class="isRTL ? 'ms-3' : 'me-3'"
                />
                <span class="text-green-400 font-medium">{{
                  $t('sidebar.title')
                }}</span>
              </div>
              <button
                @click="closeDrawer"
                class="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-black/20"
                aria-label="Close menu"
              >
                <XMarkIcon class="w-6 h-6" />
              </button>
            </div>
            <div class="overflow-y-auto h-[calc(100%-8rem)] py-4">
              <NavigationMenu
                :is-collapsed="false"
                @close-drawer="closeDrawer"
              />
            </div>
            <div
              class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-teal-950"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-green-400 flex-none"
                ></div>
                <div :class="isRTL ? 'me-3' : 'ms-3'">
                  <p class="text-sm font-medium">
                    {{ $t('sidebar.user_name') }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ $t('sidebar.user_role') }}
                  </p>
                </div>
                <div :class="isRTL ? 'ms-auto' : 'ms-auto'">
                  <Cog6ToothIcon class="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: all 0.3s ease-in-out;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-to,
.overlay-leave-from {
  opacity: 1;
}

/* LTR drawer animations */
.ltr-drawer-enter-active,
.ltr-drawer-leave-active {
  transition: transform 0.3s ease-in-out;
}

.ltr-drawer-enter-from,
.ltr-drawer-leave-to {
  transform: translateX(-100%);
}

.ltr-drawer-enter-to,
.ltr-drawer-leave-from {
  transform: translateX(0);
}

/* RTL drawer animations */
.rtl-drawer-enter-active,
.rtl-drawer-leave-active {
  transition: transform 0.3s ease-in-out;
}

.rtl-drawer-enter-from,
.rtl-drawer-leave-to {
  transform: translateX(100%);
}

.rtl-drawer-enter-to,
.rtl-drawer-leave-from {
  transform: translateX(0);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}
</style>
