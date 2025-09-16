<template>
  <footer class="bg-custom text-white py-4">
    <div class="container mx-auto text-center">
      <p class="headline-blue">&copy; {{ new Date().getFullYear() }} DB Travel API Demo. All rights reserved.</p>
    </div>
  </footer>
</template>
<style scoped>
.bg-custom {
    background-color: #abc2c9;
}

.headline-blue {
    color: #00688b;
    text-shadow: white 0px 1px 2px;
}
</style>