<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    @click="$emit('close')"
  >
    <div class="relative max-w-full max-h-full">
      <img
        :src="src"
        alt="Enlarged image"
        class="max-w-full max-h-full object-contain rounded-lg"
        @click.stop
      />
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all duration-200"
      >
        <Icon name="heroicons:x-mark" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  }
})

defineEmits(['close'])
</script>