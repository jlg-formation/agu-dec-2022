import { signal, computed } from '@angular/core';

export const array = signal<number[]>([4, 6, 9]);

export const total = computed(() => {
  return array().length;
});

export const max = computed(() => {
  return Math.max(...array());
});
