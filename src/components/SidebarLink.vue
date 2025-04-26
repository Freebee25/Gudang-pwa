<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  to: String,
  icon: String,
  label: String,
  collapsed: Boolean
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
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

<script>
import { defineComponent } from 'vue'
import {
  HomeIcon,
  ArchiveBoxIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentIcon
} from '@heroicons/vue/24/solid'

export default defineComponent({
  name: 'SidebarLink',
  components: {
    HomeIcon,
    ArchiveBoxIcon,
    ArrowUpTrayIcon,
    ClipboardDocumentIcon,
  },
  data() {
    return {
      icons: {
        home: HomeIcon,
        'archive-box': ArchiveBoxIcon,
        'arrow-up-tray': ArrowUpTrayIcon,
        'clipboard-document': ClipboardDocumentIcon,
      }
    }
  }
})
</script>
