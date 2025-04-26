<template>
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 class="text-lg font-bold mb-4">Barang Terjual Mingguan</h3>
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const chartData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Barang Terjual',
        backgroundColor: '#3b82f6',
        data: [12, 19, 3, 5, 2, 3, 10]
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
  </script>
  
  <style scoped>
  div {
    height: 300px;
  }
  </style>
  