<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  ArchiveBoxIcon,
  ArrowUpTrayIcon,
  ShoppingCartIcon,
  ClipboardDocumentIcon
} from '@heroicons/vue/24/solid'

const props = defineProps({
  to: String,
  icon: String,
  label: String,
  collapsed: Boolean
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)

const icons = {
  home: HomeIcon,
  'archive-box': ArchiveBoxIcon,
  'arrow-up-tray': ArrowUpTrayIcon,
  'shopping-cart': ShoppingCartIcon,
  'clipboard-document': ClipboardDocumentIcon
}
</script>

<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 p-2 rounded transition-all duration-200"
    :class="isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'"
  >
    <div :class="['transition-transform duration-300', isActive ? 'scale-110 rotate-12' : '']">
      <component :is="icons[icon]" class="h-5 w-5" />
    </div>
    <span v-if="!collapsed" class="truncate">{{ label }}</span>
  </router-link>
</template>
