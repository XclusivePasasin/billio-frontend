<template>
  <div 
    v-if="show" 
    :class="['alert-container', alertClass]" 
    role="alert"
  >
    <div class="flex items-center space-x-4">
      <div class="py-1">
        <slot name="icon"></slot>
      </div>
      <div class="text-center">
        <p class="font-bold">{{ title }}</p>
        <p v-if="message" class="text-sm">{{ message }}</p>
        <ul v-if="list" class="list-disc list-inside">
          <li v-for="(item, index) in list" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    list: { type: Array, default: () => [] },
    show: { type: Boolean, default: true }
  },
  computed: {
    alertClass() {
      if (this.type === 'success') {
        return 'bg-emerald-600 text-white';
      } else if (this.type === 'error') {
        return 'bg-red-500 text-white';
      } else if (this.type === 'warning') {
        return 'bg-yellow-500 text-black';
      }
      return 'bg-gray-500 text-white';
    }
  }
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 12%; /* Mantiene la alerta ligeramente por debajo de la parte superior */
  right: 8px; /* Cambiado para que la alerta esté más hacia la derecha */
  max-width: 300px;
  z-index: 1000;
  padding: 7px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center; /* Alineación vertical */
  justify-content: flex-start; /* Alineación del contenido hacia la izquierda */
  transition: right 0.3s ease-in-out; /* Transición suave al aparecer */
}

</style>
