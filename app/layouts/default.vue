<template>
  <div class="min-h-screen flex flex-col">
    <div class="sticky top-0 z-50">
      <AppHeader />
    </div>
    <main class="flex-1">
      <slot />
    </main>
    <div class="sticky bottom-0 z-50">
      <AppFooter />
    </div>
  </div>
</template>
