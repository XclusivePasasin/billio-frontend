<template>
    <div v-if="show" :class="alertClass" role="alert">
      <div class="flex">
        <div class="py-1">
          <slot name="icon"></slot>
        </div>
        <div>
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
        switch (this.type) {
          case 'success':
            return 'bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4';
          case 'warning':
            return 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4';
          case 'error':
            return 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4';
        }
      }
    }
  };
  </script>
  