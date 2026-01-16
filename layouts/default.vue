<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <UIcon name="i-heroicons-cube-transparent" class="w-8 h-8 text-primary-500" />
        <span class="text-xl font-bold text-gray-800 dark:text-white">Admin</span>
      </div>
      
      <nav class="flex-1 p-4 space-y-2">
        <UButton
          to="/"
          variant="ghost"
          block
          class="justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          active-class="bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400"
        >
          <template #leading>
            <UIcon name="i-heroicons-home" class="w-5 h-5" />
          </template>
          Dashboard
        </UButton>

        <UButton
          to="/products"
          variant="ghost"
          block
          class="justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          active-class="bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400"
        >
          <template #leading>
             <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5" />
          </template>
          Products
        </UButton>

        <UButton
          to="/categories"
          variant="ghost"
          block
          class="justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          active-class="bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400"
        >
          <template #leading>
            <UIcon name="i-heroicons-folder" class="w-5 h-5" />
          </template>
          Categories
        </UButton>
      </nav>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="User" size="sm" />
          <div class="flex-1 min-w-0">
             <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
             <p class="text-xs text-gray-500 dark:text-gray-400 truncate">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top header for mobile mainly, or breadcrumbs/actions -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between md:hidden">
        <UIcon name="i-heroicons-cube-transparent" class="w-8 h-8 text-primary-500" />
        <UButton icon="i-heroicons-bars-3" variant="ghost" color="gray" />
      </header>

      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
