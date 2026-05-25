<template>
  <div class="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800 tracking-tight rounded-lg">Experiencias Laborales</h2>
      <button 
        @click="$emit('add-experience')" 
        class="px-4 py-2 bg-gray-900 text-white text-sm font-bold font rounded-[15px] hover:bg-gray-800 transition-colors"
      >
        Agregar Experiencia
      </button>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500 text-sm">
      Cargando experiencias...
    </div>

    <div v-else-if="experiences.length === 0" class="text-center py-8 text-gray-500 text-sm border border-dashed border-gray-200 rounded">
      No se han guardado experiencias aún.
    </div>

    <div v-else class="overflow-x-auto border border-gray-100 rounded-lg">
      <table class="min-w-full divide-y divide-gray-100 text-left text-sm">
        <thead class="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">Compañía</th>
            <th scope="col" class="px-6 py-3 font-medium">Cargo</th>
            <th scope="col" class="px-6 py-3 font-medium">Periodo</th>
            <th scope="col" class="px-6 py-3 font-medium">Descripción</th>
            <th scope="col" class="px-6 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-gray-700 bg-white">
          <tr 
            v-for="exp in experiences" 
            :key="exp._id" 
            class="hover:bg-gray-100 transition-colors"
          >
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ exp.empresa }}
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap">
              {{ exp.cargo }}
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
              {{ exp.periodo || 'Contacto desde Currículo Virtual' }}
            </td>
            
            <td class="px-6 py-4 max-w-xs truncate text-gray-500" :title="exp.descripcion">
              {{ exp.descripcion || 'Sin descripción' }}
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-3">
              <button 
                @click="$emit('edit', exp)" 
                class="text-blue-400 hover:text-gray-800 transition-colors"
              >
                Editar
              </button>
              <button 
                @click="handleDelete(exp._id)" 
                class="text-red-600 hover:text-red-800  transition-colors"
              >
                Borrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define emitting events for parent component communication
const emit = defineEmits(['add-experience', 'edit', 'delete-success']);

const experiences = ref([]);
const loading = ref(true);

// Fetch data from Node.js API
const fetchExperiences = async () => {
  try {
    loading.value = true;
    // Replace with your actual API endpoint
    const response = await fetch('http://localhost:3000/api/experiencias');
    if (response.ok) {
      experiences.value = await response.json();
    }
  } catch (error) {
    console.error('Error fetching experiences:', error);
  } finally {
    loading.value = false;
  }
};

// Handle delete action
const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this experience?')) return;
  
  try {
    const response = await fetch(`http://localhost:3000/api/experiencias/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      // Refresh the list local state
      experiences.value = experiences.value.filter(exp => exp._id !== id);
      emit('delete-success', id);
    }
  } catch (error) {
    console.error('Error deleting experience:', error);
  }
};

onMounted(() => {
  fetchExperiences();
});
</script>