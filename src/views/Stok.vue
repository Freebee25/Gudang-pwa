<template>
  <div class="p-6">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4"
    >
      <h1 class="text-2xl font-bold">Stok Barang</h1>

      <div class="flex items-center gap-2">
        <input
          v-model="search"
          type="text"
          placeholder="Cari barang..."
          class="border px-3 py-2 rounded w-64"
        />
        <button
          @click="openAddModal"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Tambah Barang
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Kode Barang
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Nama Barang
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Stok Tersedia
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Harga
            </th>
            <th
              class="px-6 py-3 text-center text-sm font-semibold text-gray-700"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            v-for="(item, index) in filteredItems"
            :key="item.kode"
          >
            <td class="px-6 py-4">{{ item.kode }}</td>
            <td class="px-6 py-4">{{ item.nama }}</td>
            <td class="px-6 py-4">{{ item.stok }}</td>
            <td class="px-6 py-4">
              Rp {{ item.harga.toLocaleString("id-ID") }}
            </td>
            <td class="px-6 py-4 text-center space-x-2">
              <button
                class="text-blue-500 hover:text-blue-700"
                @click="openEditModal(index)"
              >
                Edit
              </button>
              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteItem(index)"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-bold mb-4">
          {{ isEditing ? "Edit Barang" : "Tambah Barang" }}
        </h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-gray-700">Kode Barang</label>
            <input
              v-model="form.kode"
              type="text"
              class="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Nama Barang</label>
            <input
              v-model="form.nama"
              type="text"
              class="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Stok</label>
            <input
              v-model.number="form.stok"
              type="number"
              class="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Harga</label>
            <input
              v-model.number="form.harga"
              type="number"
              class="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {{ isEditing ? "Update" : "Tambah" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Data
const items = ref([
  { kode: "BRG001", nama: "Produk A", stok: 120, harga: 50000 },
  { kode: "BRG002", nama: "Produk B", stok: 75, harga: 75000 },
  { kode: "BRG003", nama: "Produk C", stok: 30, harga: 120000 },
]);

const search = ref("");
const showModal = ref(false);
const isEditing = ref(false);
const editIndex = ref(null);

const form = ref({
  kode: "",
  nama: "",
  stok: 0,
  harga: 0,
});

// Computed untuk filter data
const filteredItems = computed(() => {
  if (!search.value) return items.value;
  return items.value.filter(
    (item) =>
      item.kode.toLowerCase().includes(search.value.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Functions
function openAddModal() {
  form.value = { kode: "", nama: "", stok: 0, harga: 0 };
  isEditing.value = false;
  showModal.value = true;
}

function openEditModal(index) {
  form.value = { ...items.value[index] };
  editIndex.value = index;
  isEditing.value = true;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function submitForm() {
  if (isEditing.value) {
    items.value[editIndex.value] = { ...form.value };
  } else {
    items.value.push({ ...form.value });
  }
  closeModal();
}

function deleteItem(index) {
  if (confirm("Yakin mau menghapus barang ini?")) {
    items.value.splice(index, 1);
  }
}
</script>
