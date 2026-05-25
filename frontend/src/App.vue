<template>
  <main class="min-h-screen bg-[#F5F5F7] py-10 px-4">
    
    <ExperienceTable 
      ref="tablaRef"
      @add-experience="mostrarFormularioAgregar" 
      @edit="mostrarFormularioEditar" 
    />

    <div v-if="mostrarFormulario" class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        {{ editando ? 'Editar Experiencia' : 'Agregar Nueva Experiencia' }}
      </h3>
      
      <form @submit.prevent="guardarExperiencia" class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase">Empresa *</label>
          <input v-model="form.empresa" type="text" required class="w-full mt-1 p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-900" />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase">Cargo *</label>
          <input v-model="form.cargo" type="text" required class="w-full mt-1 p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-900" />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase">Periodo</label>
          <input v-model="form.periodo" type="text" placeholder="Ej: Jan 2024 - Present" class="w-full mt-1 p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-900" />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase">Descripción</label>
          <textarea v-model="form.descripcion" rows="3" class="w-full mt-1 p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-900"></textarea>
        </div>

        <div class="flex justify-end space-x-3 text-sm pt-2">
          <button type="button" @click="cancelar" class="px-4 py-2 text-gray-500 hover:text-gray-700">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
            Guardar
          </button>
        </div>
      </form>
    </div>

  </main>
</template>

<script setup>

import { ref } from 'vue';
import ExperienceTable from './components/ExperienceTable.vue';

const tablaRef = ref(null);
const mostrarFormulario = ref(false);
const editando = ref(false);
const idActual = ref(null);

// Estado del formulario reactivo limpio
const form = ref({
  empresa: '',
  cargo: '',
  periodo: '',
  descripcion: ''
});

// Al hacer clic en "Add Experience"
const mostrarFormularioAgregar = () => {
  editando.value = false;
  idActual.value = null;
  form.value = { empresa: '', cargo: '', periodo: '', descripcion: '' }; // Limpiar campos
  mostrarFormulario.value = true;
};

// Al hacer clic en "Edit" dentro de la tabla
const mostrarFormularioEditar = (experiencia) => {
  editando.value = true;
  idActual.value = experiencia._id;
  // Clonamos el objeto para no modificar la tabla directamente antes de guardar
  form.value = { ...experiencia }; 
  mostrarFormulario.value = true;
};

const cancelar = () => {
  mostrarFormulario.value = false;
};

// Enviar datos a Node.js (POST para crear, PUT para actualizar)
const guardarExperiencia = async () => {
  const url = editando.value 
    ? `http://localhost:3000/api/experiencias/${idActual.value}`
    : 'http://localhost:3000/api/experiencias';
    
  const metodo = editando.value ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (response.ok) {
      mostrarFormulario.value = false;
      // Le ordenamos a la tabla que vuelva a cargar los datos actualizados de la API
      if (tablaRef.value) {
        tablaRef.value.fetchExperiences();
      }
    }
  } catch (error) {
    console.error('Error al guardar la experiencia:', error);
  }
};
</script>