<template>
  <div class="tooltip-container w-fit">
    <div
      ref="trigger"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
      @click="handleClick"
    >
      <slot></slot>
    </div>

    <transition
      enter-active-class="tooltip-enter"
      enter-from-class="tooltip-enter-from"
      enter-to-class="tooltip-enter-to"
      leave-active-class="tooltip-leave"
      leave-from-class="tooltip-leave-from"
      leave-to-class="tooltip-leave-to"
    >
      <div
        v-show="isVisible"
        class="tooltip"
        :class="positionClasses"
        role="tooltip"
        @mouseenter="tooltipMouseEnter"
        @mouseleave="tooltipMouseLeave"
      >
        {{ text }}
        <div
          class="tooltip-arrow"
          :class="arrowPositionClasses"
        ></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount, onMounted } from 'vue';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export default defineComponent({
  name: 'Tooltip',

  props: {
    text: {
      type: String,
      required: true,
    },
    position: {
      type: String as () => TooltipPosition,
      default: 'top',
      validator: (value: string): boolean =>
        ['top', 'bottom', 'left', 'right'].includes(value),
    },
    delay: {
      type: Number,
      default: 0,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const isVisible = ref<boolean>(false);
    const isHoveringTooltip = ref<boolean>(false);
    let timeoutId: number | null = null;
    let clickOutsideHandler: ((event: MouseEvent) => void) | null = null;

    const positionClasses = computed<string>(() => {
      switch (props.position) {
        case 'top':
          return 'tooltip-top';
        case 'bottom':
          return 'tooltip-bottom';
        case 'left':
          return 'tooltip-left';
        case 'right':
          return 'tooltip-right';
        default:
          return 'tooltip-top';
      }
    });

    const arrowPositionClasses = computed<string>(() => {
      switch (props.position) {
        case 'top':
          return 'arrow-top';
        case 'bottom':
          return 'arrow-bottom';
        case 'left':
          return 'arrow-left';
        case 'right':
          return 'arrow-right';
        default:
          return 'arrow-top';
      }
    });

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

    const hideTooltip = (): void => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      
      // Only hide if we're not hovering over the tooltip itself
      if (!isHoveringTooltip.value) {
        isVisible.value = false;
      }
    };
    
    const tooltipMouseEnter = (): void => {
      isHoveringTooltip.value = true;
    };
    
    const tooltipMouseLeave = (): void => {
      isHoveringTooltip.value = false;
      hideTooltip();
    };
    
    const handleClick = (): void => {
      if (props.closeOnClick) {
        isVisible.value = false;
      }
    };
    
    // Handle clicks outside the tooltip to close it
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      const tooltipElement = document.querySelector('.tooltip');
      const triggerElement = document.querySelector('.tooltip-container');
      
      if (tooltipElement && 
          triggerElement && 
          !tooltipElement.contains(target) && 
          !triggerElement.contains(target)) {
        isVisible.value = false;
      }
    };

    onMounted(() => {
      // Add global click listener to close tooltip when clicking outside
      clickOutsideHandler = handleClickOutside;
      document.addEventListener('click', clickOutsideHandler);
    });

    onBeforeUnmount(() => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      
      // Remove global click listener
      if (clickOutsideHandler) {
        document.removeEventListener('click', clickOutsideHandler);
      }
    });

    return {
      isVisible,
      positionClasses,
      arrowPositionClasses,
      showTooltip,
      hideTooltip,
      tooltipMouseEnter,
      tooltipMouseLeave,
      handleClick,
    };
  },
});
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  padding: 4px 8px;
  font-size: 10px;
  background-color: #333;
  color: white;
  border-radius: 3px;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.tooltip-arrow {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #333;
  transform: rotate(45deg);
}

/* Position classes */
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  margin-bottom: 4px;
}

.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  margin-top: 4px;
}

.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(-4px);
  margin-right: 4px;
}

.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(4px);
  margin-left: 4px;
}

/* Arrow position classes */
.arrow-top {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
}

.arrow-bottom {
  top: -3px;
  left: 50%;
  margin-left: -3px;
}

.arrow-left {
  right: -3px;
  top: 50%;
  margin-top: -3px;
}

.arrow-right {
  left: -3px;
  top: 50%;
  margin-top: -3px;
}

/* Transition classes */
.tooltip-enter {
  transition: all 0.15s ease-out;
}

.tooltip-enter-from {
  opacity: 0;
  transform-origin: center;
  transform: scale(0.95) translateX(-50%) translateY(-4px);
}

.tooltip-enter-to {
  opacity: 1;
}

.tooltip-leave {
  transition: all 0.1s ease-in;
}

.tooltip-leave-from {
  opacity: 1;
}

.tooltip-leave-to {
  opacity: 0;
  transform-origin: center;
  transform: scale(0.95) translateX(-50%) translateY(-4px);
}
</style>
