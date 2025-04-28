<template>
    <!-- Pilih Barang Manual dan Ketik -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 relative">
      <div class="relative w-64">
        <input
          v-model="searchBarang"
          type="text"
          placeholder="Ketik atau pilih barang..."
          class="border p-2 rounded w-full"
          @focus="showDropdown = true"
          @input="showDropdown = true"
          @blur="() => setTimeout(() => showDropdown = false, 150)"
        />
  
        <!-- Dropdown List -->
        <div v-if="showDropdown" class="absolute w-full bg-white border mt-1 rounded shadow max-h-48 overflow-y-auto z-10">
          <div
            v-for="barang in barangTersaring"
            :key="barang.kode"
            @click="pilihBarang(barang)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ barang.nama }} ({{ barang.kode }}) - Stok: {{ barang.stok }}
          </div>
        </div>
      </div>
  
      <input
        v-model.number="jumlah"
        type="number"
        placeholder="Jumlah"
        class="border p-2 rounded w-32"
        min="1"
      />
  
      <button @click="tambahBarang" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Tambah
      </button>
    </div>
  
    <!-- Tabel Keranjang -->
    <div v-if="keranjang.length" class="border rounded p-4">
      <h2 class="text-lg font-bold mb-4">Keranjang</h2>
      <table class="w-full table-auto">
        <thead>
          <tr class="text-left border-b">
            <th class="py-2">Nama</th>
            <th class="py-2">Jumlah</th>
            <th class="py-2">Harga</th>
            <th class="py-2">Subtotal</th>
            <th class="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in keranjang" :key="item.kode" class="border-b">
            <td class="py-2">{{ item.nama }}</td>
            <td class="py-2">{{ item.jumlah }}</td>
            <td class="py-2">Rp {{ formatRupiah(item.harga) }}</td>
            <td class="py-2">Rp {{ formatRupiah(item.harga * item.jumlah) }}</td>
            <td class="py-2">
              <button @click="hapusBarang(index)" class="text-red-500 hover:underline">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Total Keseluruhan -->
      <div class="text-right mt-4 font-bold text-lg">
        Total: Rp {{ formatRupiah(totalKeranjang) }}
      </div>
  
      <!-- Tombol Checkout -->
      <div class="flex justify-end mt-4">
        <button @click="checkout" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
          Checkout & Cetak Nota
        </button>
      </div>
    </div>
  
    <!-- Modal Nota -->
    <div v-if="showNota" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded w-96 shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-center">{{ namaToko }}</h2>
        <p class="text-center mb-2">Invoice: {{ invoiceNumber }}</p>
        <p class="text-center mb-4">Tanggal: {{ tanggalHariIni }}</p>
  
        <table class="w-full text-sm mb-4">
          <thead>
            <tr>
              <th class="text-left">Barang</th>
              <th class="text-right">Jumlah</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in keranjangCheckout" :key="item.kode">
              <td>{{ item.nama }}</td>
              <td class="text-right">{{ item.jumlah }}</td>
              <td class="text-right">Rp {{ formatRupiah(item.harga * item.jumlah) }}</td>
            </tr>
          </tbody>
        </table>
  
        <div class="text-right font-bold text-lg mb-4">
          Total: Rp {{ formatRupiah(totalCheckout) }}
        </div>
  
        <div class="flex justify-between">
          <button @click="batalNota" class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
            Batal
          </button>
          <button @click="cetakNota" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Cetak
          </button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
 import { ref, computed } from 'vue'
import dayjs from 'dayjs' 

// DATA
const namaToko = "Toko Ian Jaya" // Nama toko kamu
const searchBarang = ref('')
const selectedBarang = ref(null)
const showDropdown = ref(false)
const jumlah = ref(1)
const keranjang = ref([])
const stokBarang = ref([
  { kode: "BRG001", nama: "Produk A", stok: 100, harga: 50000 },
  { kode: "BRG002", nama: "Produk B", stok: 50, harga: 75000 },
  { kode: "BRG003", nama: "Produk C", stok: 20, harga: 100000 },
])

const barangTersaring = computed(() => {
  if (!searchBarang.value) return stokBarang.value
  return stokBarang.value.filter(barang =>
    barang.nama.toLowerCase().includes(searchBarang.value.toLowerCase()) ||
    barang.kode.toLowerCase().includes(searchBarang.value.toLowerCase())
  )
})

const totalKeranjang = computed(() => {
  return keranjang.value.reduce((total, item) => total + (item.harga * item.jumlah), 0)
})

// Nota Data
const showNota = ref(false)
const keranjangCheckout = ref([])
const totalCheckout = ref(0)
const invoiceNumber = ref('')
const tanggalHariIni = computed(() => dayjs().format('DD/MM/YYYY'))

function pilihBarang(barang) {
  selectedBarang.value = barang
  searchBarang.value = `${barang.nama} (${barang.kode})`
  showDropdown.value = false
}

function tambahBarang() {
  if (!selectedBarang.value || jumlah.value <= 0) {
    alert('Pilih barang dan jumlah dulu!')
    return
  }

  if (selectedBarang.value.stok < jumlah.value) {
    alert('Stok tidak cukup!')
    return
  }

  const existing = keranjang.value.find(item => item.kode === selectedBarang.value.kode)
  if (existing) {
    if (selectedBarang.value.stok < existing.jumlah + jumlah.value) {
      alert('Stok tidak cukup untuk menambahkan lebih banyak!')
      return
    }
    existing.jumlah += jumlah.value
  } else {
    keranjang.value.push({
      kode: selectedBarang.value.kode,
      nama: selectedBarang.value.nama,
      harga: selectedBarang.value.harga,
      jumlah: jumlah.value
    })
  }

  selectedBarang.value.stok -= jumlah.value
  searchBarang.value = ''
  selectedBarang.value = null
  jumlah.value = 1
}

function hapusBarang(index) {
  const item = keranjang.value[index]
  const barang = stokBarang.value.find(b => b.kode === item.kode)
  if (barang) {
    barang.stok += item.jumlah
  }
  keranjang.value.splice(index, 1)
}

function formatRupiah(angka) {
  return angka.toLocaleString('id-ID')
}

function checkout() {
  if (!keranjang.value.length) {
    alert('Keranjang kosong!')
    return
  }
  keranjangCheckout.value = keranjang.value.map(item => ({
    ...item
  }))
  totalCheckout.value = keranjangCheckout.value.reduce((total, item) => total + (item.harga * item.jumlah), 0)
  invoiceNumber.value = generateInvoiceNumber()
  showNota.value = true
}

function cetakNota() {
  const printWindow = window.open('', '', 'width=600,height=800')
  printWindow.document.write('<html><head><title>Nota Pembelian</title></head><body>')
  printWindow.document.write(`<div style="text-align: center; margin-bottom: 20px;">
    <h2>${namaToko}</h2>
    <div>Invoice: ${invoiceNumber.value}</div>
    <div>Tanggal: ${tanggalHariIni.value}</div>
  </div>`)
  printWindow.document.write('<table style="width: 100%; font-size: 14px; margin-bottom: 20px;" border="1" cellspacing="0" cellpadding="5">')
  printWindow.document.write('<thead><tr><th>Barang</th><th>Jumlah</th><th>Subtotal</th></tr></thead><tbody>')

  keranjangCheckout.value.forEach(item => {
    printWindow.document.write(`<tr>
      <td>${item.nama}</td>
      <td style="text-align: right;">${item.jumlah}</td>
      <td style="text-align: right;">Rp ${formatRupiah(item.harga * item.jumlah)}</td>
    </tr>`)
  })

  printWindow.document.write('</tbody></table>')
  printWindow.document.write(`<div style="text-align: right; font-weight: bold;">Total: Rp ${formatRupiah(totalCheckout.value)}</div>`)
  printWindow.document.write('</body></html>')
  printWindow.document.close()
  printWindow.print()

  // Setelah cetak, kosongkan keranjang
  keranjang.value = []
  showNota.value = false
}

function batalNota() {
  showNota.value = false
}

function generateInvoiceNumber() {
  const random = Math.floor(Math.random() * 9000) + 1000
  return `INV-${dayjs().format('YYYYMMDD')}-${random}`
}

  </script>
  