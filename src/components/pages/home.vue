<script lang="ts" setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
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

const dashboardStats: StatItem[] = [
  {
    label: 'Total Revenue',
    value: '$24,780',
    changePercentage: 12.5,
    changeText: '12.5% from last month',
    icon: BanknotesIcon,
  },
  {
    label: 'New Customers',
    value: '1,245',
    changePercentage: 8.2,
    changeText: '8.2% from last month',
    icon: ChartBarIcon,
  },
  {
    label: 'Active Projects',
    value: '48',
    changePercentage: -2.1,
    changeText: '2.1% from last month',
    icon: FireIcon,
  },
  {
    label: 'Conversion Rate',
    value: '3.6%',
    changePercentage: 1.8,
    changeText: '1.8% from last month',
    icon: SparklesIcon,
  },
];

const topProducts = ref<Product[]>([
  {
    icon: DevicePhoneMobileIcon,
    name: 'iPhone 14 Pro',
    category: 'Mobile Phones',
    price: '$899',
  },
  {
    icon: AcademicCapIcon,
    name: 'Online Course',
    category: 'Education',
    price: '$29',
  },
  {
    icon: BookOpenIcon,
    name: 'Programming Guide',
    category: 'Educational Books',
    price: '$49',
  },
  {
    icon: BriefcaseIcon,
    name: 'Business Laptop',
    category: 'Work Equipment',
    price: '$129',
  },
  {
    icon: MicrophoneIcon,
    name: 'Podcast Microphone',
    category: 'Audio Equipment',
    price: '$79',
  },
]);

const recentActivities = ref<Activity[]>([
  {
    icon: ShoppingBagIcon,
    title: 'New Order Received',
    time: '2 hours ago',
    description: 'Customer #1242 placed an order for $345.00',
  },
  {
    icon: UserPlusIcon,
    title: 'New Customer Registered',
    time: '4 hours ago',
    description: 'John Smith created a new account',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'New Review',
    time: 'Yesterday',
    description: 'Customer #3214 left a 5-star review',
  },
  {
    icon: TruckIcon,
    title: 'Order Shipped',
    time: 'Yesterday',
    description: 'Order #5678 has been shipped to customer',
  },
]);

// Lifecycle
onMounted((): void => {
  initMainChart();
});

// Methods
function initMainChart(): void {
  const chartCtx = mainChartRef.value?.getContext('2d');
  if (!chartCtx) return;

  const chartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
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

onUnmounted((): void => {
  if (mainChart) {
    mainChart.destroy();
    mainChart = null;
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
    <div
      class="lg:col-span-2 bg-teal-950 rounded-xl p-6 border border-gray-700"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-semibold">Revenue Overview</h3>
        <div class="flex space-x-2">
          <button class="px-3 py-1 text-xs bg-teal-500 text-black rounded-lg">
            Month
          </button>
          <button
            class="px-3 py-1 text-xs bg-teal-950 text-gray-300 rounded-lg"
          >
            Week
          </button>
          <button
            class="px-3 py-1 text-xs bg-teal-950 text-gray-300 rounded-lg"
          >
            Day
          </button>
        </div>
      </div>
      <div class="chart-container max-h-60">
        <canvas ref="mainChartRef" height="250"></canvas>
      </div>
    </div>

    <!-- Progress Chart -->
    <div class="bg-teal-950 rounded-xl p-6 border border-gray-700">
      <h3 class="font-semibold mb-6">Sales Target</h3>
      <div class="flex flex-col items-center">
        <div class="relative w-40 h-40 mb-4">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle
              class="text-gray-700"
              stroke-width="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              class="text-green-400 progress-ring__circle"
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
            <span class="text-2xl font-bold">70%</span>
            <p class="text-xs text-gray-400">Completed</p>
          </div>
        </div>
        <div class="w-full">
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>Target</span>
            <span>$50,000</span>
          </div>
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>Achieved</span>
            <span>$35,000</span>
          </div>
          <div class="flex justify-between text-xs text-green-400 mb-1">
            <span>Remaining</span>
            <span>$15,000</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
