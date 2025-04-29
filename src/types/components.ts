import type { Component } from 'vue';

export interface StatItem {
  label: string;
  value: string;
  changePercentage: number;
  changeText: string;
  icon: Component;
}

export interface Activity {
  icon: Component;
  title: string;
  time: string;
  description: string;
}

export interface Product {
  icon: Component;
  name: string;
  category: string;
  price: string;
}

export type SupportedLanguages = 'en' | 'fa';
