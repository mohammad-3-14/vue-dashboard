<script lang="ts" setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import StatsCard from '@/components/shared/statsCard.vue';
import type { StatItem, Product, Activity } from '@/types/components';
import TopProducts from '@/components/shared/topProducts.vue';
import RecentActivity from '@/components/shared/recentActivity.vue';

import {
  Chart,
  type ChartConfiguration,
  type ChartData,
  type ChartOptions,
} from 'chart.js/auto';

import {
  BanknotesIcon,
  ChartBarIcon,
  FireIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
  BookOpenIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  MicrophoneIcon,
  ShoppingBagIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
} from '@heroicons/vue/24/outline';

// i18n
const { t, locale } = useI18n();

// Refs
const mainChartRef = ref<HTMLCanvasElement | null>(null);
let mainChart: Chart | null = null;

// Computed
const circumference = computed((): number => {
  const radius = 40;
  return radius * 2 * Math.PI;
});

const dashOffset = computed((): number => {
  return circumference.value - (70 / 100) * circumference.value;
});

// Dashboard Stats - به صورت computed
const dashboardStats = computed((): StatItem[] => [
  {
    label: t('dashboard.totalRevenue'),
    value: '$24,780',
    changePercentage: 12.5,
    changeText: t('dashboard.changeFromLastMonth', { value: '12.5%' }),
    icon: BanknotesIcon,
  },
  {
    label: t('dashboard.newCustomers'),
    value: '1,245',
    changePercentage: 8.2,
    changeText: t('dashboard.changeFromLastMonth', { value: '8.2%' }),
    icon: ChartBarIcon,
  },
  {
    label: t('dashboard.activeProjects'),
    value: '48',
    changePercentage: -2.1,
    changeText: t('dashboard.changeFromLastMonth', { value: '2.1%' }),
    icon: FireIcon,
  },
  {
    label: t('dashboard.conversionRate'),
    value: '3.6%',
    changePercentage: 1.8,
    changeText: t('dashboard.changeFromLastMonth', { value: '1.8%' }),
    icon: SparklesIcon,
  },
]);

// Top Products - به صورت computed
const topProducts = computed((): Product[] => [
  {
    icon: DevicePhoneMobileIcon,
    name: t('products.iphone14'),
    category: t('products.mobilePhones'),
    price: '$899',
  },
  {
    icon: AcademicCapIcon,
    name: t('products.onlineCourse'),
    category: t('products.education'),
    price: '$29',
  },
  {
    icon: BookOpenIcon,
    name: t('products.programmingGuide'),
    category: t('products.educationalBooks'),
    price: '$49',
  },
  {
    icon: BriefcaseIcon,
    name: t('products.businessLaptop'),
    category: t('products.workEquipment'),
    price: '$129',
  },
  {
    icon: MicrophoneIcon,
    name: t('products.podcastMicrophone'),
    category: t('products.audioEquipment'),
    price: '$79',
  },
]);

// Recent Activities - به صورت computed
const recentActivities = computed((): Activity[] => [
  {
    icon: ShoppingBagIcon,
    title: t('activities.newOrderReceived'),
    time: t('activities.timeAgo', { time: '2' }),
    description: t('activities.customerOrder', {
      id: '1242',
      amount: '$345.00',
    }),
  },
  {
    icon: UserPlusIcon,
    title: t('activities.newCustomerRegistered'),
    time: t('activities.timeAgo', { time: '4' }),
    description: t('activities.customerCreated', { name: 'John Smith' }),
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: t('activities.newReview'),
    time: t('activities.yesterday'),
    description: t('activities.customerReview', { id: '3214' }),
  },
  {
    icon: TruckIcon,
    title: t('activities.orderShipped'),
    time: t('activities.yesterday'),
    description: t('activities.orderShippedDescription', { id: '5678' }),
  },
]);

// Lifecycle
onMounted((): void => {
  initMainChart();
});

onUnmounted((): void => {
  if (mainChart) {
    mainChart.destroy();
    mainChart = null;
  }
});

// Methods
function initMainChart(): void {
  const chartCtx = mainChartRef.value?.getContext('2d');
  if (!chartCtx) return;

  const chartData: ChartData = {
    labels: [
      t('months.jan'),
      t('months.feb'),
      t('months.mar'),
      t('months.apr'),
      t('months.may'),
      t('months.jun'),
      t('months.jul'),
    ],
    datasets: [
      {
        label: t('charts.revenue'),
        data: [12000, 19000, 15000, 18000, 22000, 24000, 28000],
        borderColor: '#50c878',
        backgroundColor: 'rgba(80, 200, 120, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
  };

  const config: ChartConfiguration = {
    type: 'line',
    data: chartData,
    options: chartOptions,
  };

  mainChart = new Chart(chartCtx, config);
}

// نظارت بر تغییرات زبان برای به‌روزرسانی نمودار
watch(locale, () => {
  if (mainChart) {
    // به‌روزرسانی برچسب‌های نمودار
    mainChart.data.labels = [
      t('months.jan'),
      t('months.feb'),
      t('months.mar'),
      t('months.apr'),
      t('months.may'),
      t('months.jun'),
      t('months.jul'),
    ];

    // به‌روزرسانی عنوان dataset
    if (mainChart.data.datasets && mainChart.data.datasets.length > 0) {
      mainChart.data.datasets[0].label = t('charts.revenue');
    }

    // اعمال تغییرات
    mainChart.update();
  }
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard
      v-for="stat in dashboardStats"
      :key="stat.label"
      :label="stat.label"
      :value="stat.value"
      :changePercentage="stat.changePercentage"
      :changeText="stat.changeText"
      :icon="stat.icon"
    />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <!-- Main Chart -->
    <div class="lg:col-span-2 bg-core-950 rounded-xl p-6 shadow-2xl">
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-semibold">{{ $t('charts.revenueOverview') }}</h3>
        <div class="flex space-x-2">
          <button class="px-3 py-1 text-xs bg-core-600 text-text rounded-lg">
            {{ $t('months.months') }}
          </button>
          <button
            class="px-3 py-1 text-xs bg-core-950 text-sub-text rounded-lg"
          >
            {{ $t('months.week') }}
          </button>
          <button
            class="px-3 py-1 text-xs bg-core-950 text-sub-text rounded-lg"
          >
            {{ $t('months.day') }}
          </button>
        </div>
      </div>
      <div class="chart-container max-h-60">
        <canvas ref="mainChartRef" height="250"></canvas>
      </div>
    </div>

    <!-- Progress Chart -->
    <div class="bg-core-950 rounded-xl p-6 shadow-2xl">
      <h3 class="font-semibold mb-6">{{ $t('charts.salesTarget') }}</h3>
      <div class="flex flex-col items-center">
        <div class="relative w-40 h-40 mb-4">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle
              class="text-core-800"
              stroke-width="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              class="text-primary progress-ring__circle"
              stroke-width="8"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              stroke-linecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <span class="text-2xl font-bold text-text">70%</span>
            <p class="text-xs text-sub-text">{{ $t('charts.completed') }}</p>
          </div>
        </div>
        <div class="w-full">
          <div class="flex justify-between text-xs text-sub-text mb-1">
            <span>{{ $t('charts.target') }}</span>
            <span>$50,000</span>
          </div>
          <div class="flex justify-between text-xs text-sub-text mb-1">
            <span>{{ $t('charts.achieved') }}</span>
            <span>$35,000</span>
          </div>
          <div class="flex justify-between text-xs text-primary mb-1">
            <span> {{ $t('charts.remaining') }}</span>
            <span>$15,000</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
    <RecentActivity :recentActivities="recentActivities" />
    <TopProducts :topProducts="topProducts" />
  </div>



</template>

<style>
.progress-ring__circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
