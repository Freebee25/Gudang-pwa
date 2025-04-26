<script setup>
import Sidebar from './components/Sidebar.vue'
import { ref } from 'vue'

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header/Navbar -->
      <header class="bg-white shadow-md p-4 flex items-center justify-between md:hidden">
        <h1 class="text-xl font-bold">Gudang</h1>
        <button @click="toggleSidebar" class="text-gray-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <main class="flex-1 overflow-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
