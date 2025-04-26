<template>
  <div class="p-6">
    <!-- Greeting -->
    <h2 class="text-2xl font-semibold mb-4">Selamat {{ greeting }} 👋</h2>
    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <!-- Card: Stok Tersedia -->
      <div class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
        <ArchiveBoxIcon class="w-10 h-10 text-blue-500" />
        <div>
          <h3 class="text-sm text-gray-500">Stok Tersedia</h3>
          <p class="text-xl font-semibold">120</p>
        </div>
      </div>

      <!-- Card: Barang Terjual -->
      <div class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
        <ArrowTrendingUpIcon class="w-10 h-10 text-green-500" />
        <div>
          <h3 class="text-sm text-gray-500">Barang Terjual</h3>
          <p class="text-xl font-semibold">87</p>
        </div>
      </div>

      <!-- Card: Pemasukan -->
      <div class="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
        <CurrencyDollarIcon class="w-10 h-10 text-yellow-500" />
        <div>
          <h3 class="text-sm text-gray-500">Pemasukan</h3>
          <p class="text-xl font-semibold">Rp 12.500.000</p>
        </div>
      </div>
    </div>

    <!-- Weekly Chart -->
    <WeeklyChart class="mt-10" />
  </div>
</template>

<script setup>
import {
  ArchiveBoxIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/solid";

import WeeklyChart from "../components/WeeklyChart.vue";

// Waktu berdasarkan WIB
function getWIBHour() {
  const date = new Date();
  const options = { timeZone: "Asia/Jakarta", hour: "numeric", hour12: false };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

// Tentukan greeting
const hour = parseInt(getWIBHour());
let greeting = "pagi";

if (hour >= 12 && hour < 15) {
  greeting = "siang";
} else if (hour >= 15 && hour < 18) {
  greeting = "sore";
} else if (hour >= 18 || hour < 4) {
  greeting = "malam";
}
</script>
