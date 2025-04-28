import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Stok from '../views/Stok.vue'
import BarangKeluar from '../views/BarangKeluar.vue'
import Laporan from '../views/Laporan.vue'
import Transaksi from '../views/Transaksi.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/stok', name: 'Stok', component: Stok },
  { path: '/barang-keluar', name: 'BarangKeluar', component: BarangKeluar },
  { path: '/laporan', name: 'Laporan', component: Laporan },
  { path: '/transaksi', name: 'Transaksi', component: Transaksi},
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
