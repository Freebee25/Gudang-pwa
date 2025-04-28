<template>
  <!-- Backdrop for mobile -->
  <div
    v-if="open"
    class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
    @click="$emit('close')"
  ></div>

  <aside
    :class="[
      'fixed z-40 top-0 left-0 h-full bg-gray-800 text-white flex flex-col transform transition-transform duration-300',
      isCollapsed ? 'w-20' : 'w-64',
      open ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static',
    ]"
  >
    <!-- Sidebar header -->
    <div class="flex items-center justify-between p-4">
      <span v-if="!isCollapsed" class="text-xl font-bold">Gudang</span>
      <button @click="toggleCollapse" class="md:block hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Menu -->
    <nav class="flex flex-col gap-2 p-4">
      <SidebarLink
        to="/"
        icon="home"
        label="Dashboard"
        :collapsed="isCollapsed"
      />
      <SidebarLink
        to="/stok"
        icon="archive-box"
        label="Stok"
        :collapsed="isCollapsed"
      />
      <SidebarLink
        to="/barang-keluar"
        icon="arrow-up-tray"
        label="Barang Keluar"
        :collapsed="isCollapsed"
      />
      <SidebarLink
        to="/transaksi"
        icon="shopping-cart"
        label="Transaksi"
        :collapsed="isCollapsed"
      />
      <SidebarLink
        to="/laporan"
        icon="clipboard-document"
        label="Laporan"
        :collapsed="isCollapsed"
      />
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import SidebarLink from "./SidebarLink.vue";

defineProps(["open"]);
defineEmits(["close"]);

const isCollapsed = ref(false);
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>
