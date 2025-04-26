<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Laporan Penjualan</h1>

    <!-- Filter Tanggal -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <input type="date" v-model="startDate" class="border p-2 rounded" />
      <input type="date" v-model="endDate" class="border p-2 rounded" />
      <button
        @click="exportToExcel"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Export Excel
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="min-w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th class="py-3 px-4">Kode Barang</th>
            <th class="py-3 px-4">Nama Barang</th>
            <th class="py-3 px-4">Stok Terjual</th>
            <th class="py-3 px-4">Harga</th>
            <th class="py-3 px-4">Tanggal & Waktu</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr
            v-for="(item, index) in filteredLaporan"
            :key="index"
            class="border-t"
          >
            <td class="py-3 px-4">{{ item.kode }}</td>
            <td class="py-3 px-4">{{ item.nama }}</td>
            <td class="py-3 px-4">{{ item.stokTerjual }}</td>
            <td class="py-3 px-4">Rp {{ formatHarga(item.harga) }}</td>
            <td class="py-3 px-4">{{ formatTanggal(item.tanggal) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import * as XLSX from "xlsx";

// Data dummy (nanti bisa dihubungkan ke database lokal)
const laporan = ref([
  {
    kode: "BRG-001",
    nama: "Tang",
    stokTerjual: 12,
    harga: 15000,
    tanggal: new Date("2025-04-25T09:20:00"),
  },
  {
    kode: "BRG-002",
    nama: "Obeng",
    stokTerjual: 7,
    harga: 20000,
    tanggal: new Date("2025-04-26T14:45:00"),
  },
  {
    kode: "BRG-003",
    nama: "Gunting",
    stokTerjual: 5,
    harga: 10000,
    tanggal: new Date("2025-04-26T18:10:00"),
  },
]);

const startDate = ref("");
const endDate = ref("");

// Filter laporan berdasarkan tanggal
const filteredLaporan = computed(() => {
  if (!startDate.value && !endDate.value) return laporan.value;

  return laporan.value.filter((item) => {
    const itemDate = new Date(item.tanggal).toISOString().split("T")[0];
    const start = startDate.value || "0000-00-00";
    const end = endDate.value || "9999-12-31";
    return itemDate >= start && itemDate <= end;
  });
});

function formatHarga(harga) {
  return harga.toLocaleString("id-ID");
}

function formatTanggal(tanggal) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(tanggal);
}

// Export ke Excel
function exportToExcel() {
  const data = filteredLaporan.value.map((item) => ({
    "Kode Barang": item.kode,
    "Nama Barang": item.nama,
    "Stok Terjual": item.stokTerjual,
    Harga: item.harga,
    Tanggal: formatTanggal(item.tanggal),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

  XLSX.writeFile(
    workbook,
    `laporan-${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}
</script>
