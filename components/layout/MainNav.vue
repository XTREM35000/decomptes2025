<template>
  <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/" class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-primary-600 dark:text-primary-400">
              AutoDécompte Pro Secure
            </h1>
          </NuxtLink>
          
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink to="/">Tableau de Bord</NavLink>
            <NavLink to="/decomptes">Décomptes</NavLink>
            <NavLink to="/signatures">Signatures</NavLink>
            <NavLink to="/historique">Historique</NavLink>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  </nav>
</template>