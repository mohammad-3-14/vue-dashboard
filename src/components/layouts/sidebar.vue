<script lang="ts" setup>
import {
  Squares2X2Icon,
  ChartBarIcon,
  ChartPieIcon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps({
  isSidebarCollapsed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <aside
    :class="[
      'bg-teal-950 shadow-lg flex sticky top-24 z-0 flex-col max-h-[80dvh] min-h-96 rounded-xl transition-all duration-300',
      isSidebarCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <div class="p-6 flex items-center space-x-3">
      <div
        class="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center"
      ></div>
      <h1
        :class="[
          'text-xl font-bold text-green-400 transition-opacity duration-300',
          isSidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100',
        ]"
      >
        {{ $t('sidebar.title') }}
      </h1>
    </div>

    <div class="flex-1 overflow-y-auto pt-4">
      <nav class="px-4 space-y-1">
        <a
          href="#"
          :class="[
            'hover:bg-black/20 flex items-center py-3 rounded-lg text-green-400 bg-black/40 h-12 transition-all duration-300',
            isSidebarCollapsed ? 'justify-center px-2' : 'px-4',
          ]"
        >
          <Squares2X2Icon
            class="w-6 h-6 min-w-6"
            :class="isSidebarCollapsed ? '' : 'me-3'"
          />
          <span
            :class="[
              'transition-opacity duration-300',
              isSidebarCollapsed
                ? 'opacity-0 w-0 overflow-hidden'
                : 'opacity-100',
            ]"
          >
            {{ $t('sidebar.dashboard') }}
          </span>
        </a>

        <a
          href="#"
          :class="[
            'hover:bg-black/20 flex items-center py-3 rounded-lg text-gray-300 hover:text-green-400 h-12 transition-all duration-300',
            isSidebarCollapsed ? 'justify-center px-2' : 'px-4',
          ]"
        >
          <ChartBarIcon
            class="w-6 h-6 min-w-6"
            :class="isSidebarCollapsed ? '' : 'me-3'"
          />
          <span
            :class="[
              'transition-opacity duration-300',
              isSidebarCollapsed
                ? 'opacity-0 w-0 overflow-hidden'
                : 'opacity-100',
            ]"
          >
            {{ $t('sidebar.analytics') }}
          </span>
        </a>

        <a
          href="#"
          :class="[
            'hover:bg-black/20 flex items-center py-3 rounded-lg text-gray-300 hover:text-green-400 h-12 transition-all duration-300',
            isSidebarCollapsed ? 'justify-center px-2' : 'px-4',
          ]"
        >
          <ChartPieIcon
            class="w-6 h-6 min-w-6"
            :class="isSidebarCollapsed ? '' : 'me-3'"
          />
          <span
            :class="[
              'transition-opacity duration-300',
              isSidebarCollapsed
                ? 'opacity-0 w-0 overflow-hidden'
                : 'opacity-100',
            ]"
          >
            {{ $t('sidebar.finance') }}
          </span>
        </a>

        <a
          href="#"
          :class="[
            'hover:bg-black/20 flex items-center py-3 rounded-lg text-gray-300 hover:text-green-400 h-12 transition-all duration-300',
            isSidebarCollapsed ? 'justify-center px-2' : 'px-4',
          ]"
        >
          <BuildingStorefrontIcon
            class="w-6 h-6 min-w-6"
            :class="isSidebarCollapsed ? '' : 'me-3'"
          />
          <span
            :class="[
              'transition-opacity duration-300',
              isSidebarCollapsed
                ? 'opacity-0 w-0 overflow-hidden'
                : 'opacity-100',
            ]"
          >
            {{ $t('sidebar.customers') }}
          </span>
        </a>

        <a
          href="#"
          :class="[
            'hover:bg-black/20 flex items-center py-3 rounded-lg text-gray-300 hover:text-green-400 h-12 transition-all duration-300',
            isSidebarCollapsed ? 'justify-center px-2' : 'px-4',
          ]"
        >
          <Cog6ToothIcon
            class="w-6 h-6 min-w-6"
            :class="isSidebarCollapsed ? '' : 'me-3'"
          />
          <span
            :class="[
              'transition-opacity duration-300',
              isSidebarCollapsed
                ? 'opacity-0 w-0 overflow-hidden'
                : 'opacity-100',
            ]"
          >
            {{ $t('sidebar.settings') }}
          </span>
        </a>
      </nav>

      <div
        :class="[
          'px-4 mt-8 transition-opacity duration-300',
          isSidebarCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100',
        ]"
      >
        <!-- خالیه الان -->
      </div>
    </div>

    <div class="p-4 border-t border-gray-700">
      <div class="flex items-center">
        <div
          :class="[
            'w-10 h-10 rounded-full bg-green-400',
            isSidebarCollapsed ? 'mx-auto' : '',
          ]"
        ></div>

        <div
          :class="[
            'ms-3 transition-opacity duration-300',
            isSidebarCollapsed
              ? 'opacity-0 w-0 overflow-hidden'
              : 'opacity-100',
          ]"
        >
          <p class="text-sm font-medium">{{ $t('sidebar.user_name') }}</p>
          <p class="text-xs text-gray-400">{{ $t('sidebar.user_role') }}</p>
        </div>

        <div
          :class="[
            'ms-auto relative transition-opacity duration-300',
            isSidebarCollapsed
              ? 'opacity-0 w-0 overflow-hidden'
              : 'opacity-100',
          ]"
        ></div>
      </div>
    </div>
  </aside>
</template>

<style scoped></style>
