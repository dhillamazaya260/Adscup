<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <h2>Dashboard Campaign Adscup</h2>
      <p>Lengkapi detail campaign Anda di bawah ini.</p>
    </header>

    <div class="dashboard-content">
      <!-- 1. Import Design -->
      <section class="dashboard-section">
        <h3>1. Import Desain Cup</h3>
        <p>Unggah desain logo atau visual campaign Anda (Format: PNG, JPG, PDF).</p>
        <div class="upload-area">
          <input type="file" id="design-upload" @change="handleFileUpload" accept=".png, .jpg, .jpeg, .pdf" />
          <p v-if="fileName">File terpilih: <strong>{{ fileName }}</strong></p>
        </div>
      </section>

      <!-- 2. Paket Harga & Tipe Kopi -->
      <section class="dashboard-section">
        <h3>2. Pilih Paket Tipe Kopi</h3>
        <div class="card-grid">
          <div 
            v-for="paket in coffeeTypes" 
            :key="paket.id" 
            class="card"
            :class="{ active: selectedType === paket.id }"
            @click="selectedType = paket.id"
          >
            <h4>{{ paket.name }}</h4>
            <p class="price">Rp {{ paket.price }} / cup</p>
            <p class="desc">{{ paket.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 3. Paket Rasa Kopi -->
      <section class="dashboard-section">
        <h3>3. Pilih Paket Rasa</h3>
        <div class="card-grid">
          <div 
            v-for="rasa in flavorPackages" 
            :key="rasa.id" 
            class="card"
            :class="{ active: selectedFlavor === rasa.id }"
            @click="selectedFlavor = rasa.id"
          >
            <h4>{{ rasa.name }}</h4>
            <ul>
              <li v-for="(item, index) in rasa.items" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Action Button -->
      <div class="action-section">
        <button class="btn-submit" @click="submitCampaign" :disabled="!isFormComplete">
          Simpan & Lanjutkan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State untuk file desain
const selectedFile = ref(null);
const fileName = ref('');

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file; // Simpan file aslinya
    fileName.value = file.name; // Simpan nama filenya untuk UI
  }
};

// ... (State coffeeTypes dan flavorPackages biarkan sama seperti sebelumnya) ...

// Validasi Form
const isFormComplete = computed(() => {
  return selectedFile.value !== null && selectedType.value !== null && selectedFlavor.value !== null;
});

// State untuk loading saat submit
const isSubmitting = ref(false);

// Submit Handler ke Backend / API
const submitCampaign = async () => {
  if (!isFormComplete.value) return;

  isSubmitting.value = true;

  // 1. Buat object FormData
  const formData = new FormData();
  formData.append('design_file', selectedFile.value);
  formData.append('coffee_type', selectedType.value);
  formData.append('flavor_package', selectedFlavor.value);
  
  // (Opsional) Jika ada ID brand dari form sebelumnya, tambahkan juga:
  // formData.append('brand_id', '12345'); 

  try {
    // 2. Kirim data ke API Backend kamu
    // Ganti URL ini dengan endpoint API aslimu, misalnya: https://api.adscup.id/campaigns
    const response = await fetch('https://YOUR_BACKEND_API_URL/api/campaigns', {
      method: 'POST',
      body: formData, // Jangan set Content-Type manual, biarkan browser yang set boundary untuk multipart/form-data
    });

    if (!response.ok) {
      throw new Error('Gagal menyimpan data');
    }

    const result = await response.json();
    console.log('Berhasil:', result);
    alert('Mantap! Detail campaign berhasil disimpan dan sedang kami proses.');
    
    // 3. Redirect ke halaman Sukses atau Pembayaran
    // router.push({ name: 'SuccessPage' });

  } catch (error) {
    console.error('Error saat submit:', error);
    alert('Terjadi kesalahan saat mengunggah data. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Basic styling agar bentuknya rapi, bisa disesuaikan dengan main.css kamu */
.dashboard-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}
.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}
.dashboard-section {
  margin-bottom: 2.5rem;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.card {
  border: 2px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}
.card:hover {
  border-color: #aaa;
}
.card.active {
  border-color: #4CAF50;
  background-color: #e8f5e9;
}
.price {
  font-weight: bold;
  color: #4CAF50;
}
.upload-area {
  margin-top: 1rem;
}
.btn-submit {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
}
.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>