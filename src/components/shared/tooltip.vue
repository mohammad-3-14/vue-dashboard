<template>
  <div class="relative inline-block">
    <!-- محتوای اصلی که tooltip روی آن نمایش داده می‌شود -->
    <div
      ref="trigger"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
    >
      <slot></slot>
    </div>

    <!-- تولتیپ -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="isVisible"
        class="absolute z-50 px-3 py-2 text-sm font-medium bg-teal-600 text-gray-900 rounded-md shadow-sm whitespace-nowrap border-0"
        :class="positionClasses"
        role="tooltip"
      >
        {{ text }}
        <!-- مثلث کوچک (arrow) -->
        <div
          class="absolute w-3 h-3 bg-teal-600 border-0 transform rotate-45"
          :class="[
            arrowPositionClasses,
            { 'border-r border-b': position === 'top' },
            { 'border-l border-t': position === 'bottom' },
            { 'border-t border-r': position === 'left' },
            { 'border-b border-l': position === 'right' },
          ]"
        ></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from 'vue';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export default defineComponent({
  name: 'Tooltip',

  props: {
    // متن داخل تولتیپ
    text: {
      type: String,
      required: true,
    },

    // موقعیت تولتیپ: بالا، پایین، چپ، راست
    position: {
      type: String as () => TooltipPosition,
      default: 'top',
      validator: (value: string): boolean =>
        ['top', 'bottom', 'left', 'right'].includes(value),
    },

    // زمان تاخیر برای نمایش تولتیپ (میلی‌ثانیه)
    delay: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const isVisible = ref<boolean>(false);
    let timeoutId: number | null = null;

    // کلاس‌های مربوط به موقعیت تولتیپ
    const positionClasses = computed<string>(() => {
      switch (props.position) {
        case 'top':
          return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1';
        case 'bottom':
          return 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1';
        case 'left':
          return 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-1';
        case 'right':
          return 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-1';
        default:
          return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1';
      }
    });

    // کلاس‌های مربوط به موقعیت مثلث (arrow)
    const arrowPositionClasses = computed<string>(() => {
      switch (props.position) {
        case 'top':
          return 'bottom-0 left-1/2 -mb-1.5 -ml-1.5 border-t-0 border-l-0';
        case 'bottom':
          return 'top-0 left-1/2 -mt-1.5 -ml-1.5 border-b-0 border-r-0';
        case 'left':
          return 'right-0 top-1/2 -mr-1.5 -mt-1.5 border-l-0 border-b-0';
        case 'right':
          return 'left-0 top-1/2 -ml-1.5 -mt-1.5 border-r-0 border-t-0';
        default:
          return 'bottom-0 left-1/2 -mb-1.5 -ml-1.5 border-t-0 border-l-0';
      }
    });

    // نمایش تولتیپ
    const showTooltip = (): void => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      if (props.delay > 0) {
        timeoutId = window.setTimeout(() => {
          isVisible.value = true;
        }, props.delay);
      } else {
        isVisible.value = true;
      }
    };

    // مخفی کردن تولتیپ
    const hideTooltip = (): void => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      isVisible.value = false;
    };

    // اطمینان از پاکسازی تایمر در صورت حذف کامپوننت
    onBeforeUnmount(() => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    });

    return {
      isVisible,
      positionClasses,
      arrowPositionClasses,
      showTooltip,
      hideTooltip,
    };
  },
});
</script>
