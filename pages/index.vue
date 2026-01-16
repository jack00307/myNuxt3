<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-primary" />
            <h3 class="text-lg font-semibold">Total Revenue</h3>
          </div>
        </template>
        <div class="text-3xl font-bold">$124,500</div>
        <p class="text-sm text-gray-500 mt-2">+12% from last month</p>
      </UCard>
      
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6 text-green-500" />
            <h3 class="text-lg font-semibold">Products</h3>
          </div>
        </template>
        <div class="text-3xl font-bold">45</div>
        <p class="text-sm text-gray-500 mt-2">5 low stock</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-folder" class="w-6 h-6 text-orange-500" />
            <h3 class="text-lg font-semibold">Categories</h3>
          </div>
        </template>
        <div class="text-3xl font-bold">8</div>
        <p class="text-sm text-gray-500 mt-2">Active categories</p>
      </UCard>
    </div>
  </div>
</template>
